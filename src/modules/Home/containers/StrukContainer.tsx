import React, {useCallback, useEffect, useRef, useState} from 'react';
import StrukComponent from '../components/StrukComponent';
import {useFocusEffect} from '@react-navigation/native';
import {getStoreProfile} from '../../Profile/store/ProfileService';
import {transformCheckoutData} from '../../../property';
import {getCheckoutsReverse} from '../store/HomeService';
import {PermissionsAndroid} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {BluetoothEscposPrinter} from '@brooons/react-native-bluetooth-escpos-printer';
import moment from 'moment';
import {getCheckoutItemsByCheckoutId} from '../../History/store/HistoryService';
import {formatUang} from '../../../property/helpers/Helpers';
import {modalError, modalSuccess} from '../../../components';

const StrukContainer = () => {
  const viewShotRefStruk = useRef(null);
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [storePhone, setStorePhone] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeName, setStoreName] = useState('');
  const [listCheckout, setListCheckout] = useState([]);
  const [deviceTerhubung, setDeviceTerhubung] = useState('');
  const [showModalCetak, setShowModalCetak] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const filterBase64 = photoUrl.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

  const checkoutLatest = listCheckout[0];
  const checkoutId = checkoutLatest?.id;

  useFocusEffect(
    useCallback(() => {
      const fetchStoreProfile = async () => {
        try {
          const profile = await getStoreProfile();
          if (profile) {
            setPhotoUrl(profile.photoUrl);
            setStorePhone(profile.storePhone);
            setStoreAddress(profile.storeAddress);
            setDeviceTerhubung(profile.deviceTerhubung);
            setStoreName(profile.storeName);
          }
        } catch (error) {
          console.error('Failed to fetch store profile', error);
        }
      };

      fetchStoreProfile();
    }, []),
  );

  useEffect(() => {
    const fetchItems = async () => {
      if (checkoutId) {
        try {
          const itemsData: any = await getCheckoutItemsByCheckoutId(checkoutId);
          setCheckoutItems(itemsData);
        } catch (error) {
          console.error('Error fetching checkout items:', error);
        }
      }
    };
    fetchItems();
  }, [checkoutItems.length, checkoutId]);

  useFocusEffect(
    useCallback(() => {
      const fetchCheckouts = async () => {
        try {
          const rawCheckouts = await getCheckoutsReverse();
          const transformedCheckouts: any = transformCheckoutData(rawCheckouts);
          if (transformedCheckouts) {
            setListCheckout(transformedCheckouts);
          }
        } catch (error) {}
      };

      fetchCheckouts();
    }, [checkoutId]),
  );

  const requestEksternalStoragePermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
    }
  };

  useEffect(() => {
    requestEksternalStoragePermission();
  });

  const captureView = async () => {
    try {
      const uri = await captureRef(viewShotRefStruk, {
        format: 'jpg',
        quality: 0.8,
      });
      const filePath = `${
        RNFS.PicturesDirectoryPath
      }/capture_${Date.now()}.jpg`;
      await RNFS.copyFile(uri, filePath);
      modalSuccess('Berhasil disimpan digallery');
    } catch (error) {
      modalError('Gagal disimpan digallery');
    }
  };

  const printLabel = async () => {
    if (!deviceTerhubung) {
      setShowModalCetak(true);
      return;
    }

    setLoading(true);
    try {
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );

      if (photoUrl) {
        await BluetoothEscposPrinter.printPic(filterBase64, {
          width: 200,
          left: 90,
        });
      }

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      if (storeName) {
        await BluetoothEscposPrinter.printText(`${storeName}\r\n`, {});
      }
      if (storeAddress) {
        await BluetoothEscposPrinter.printText(`${storeAddress}\r\n`, {});
      }
      if (storePhone) {
        await BluetoothEscposPrinter.printText(`${storePhone}\r\n`, {});
      }

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT,
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );

      await BluetoothEscposPrinter.printText(`${checkoutLatest.orderId}\r\n`, {
        fonttype: 1,
      });
      await BluetoothEscposPrinter.printText(
        `${moment(new Date()).format('DD-MMM-YYYY HH:mm')}\r\n`,
        {fonttype: 1},
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );

      for (const row of checkoutItems) {
        const totalPrice = row.price * row.quantity;
        const price = formatUang(row.price);
        const total = formatUang(totalPrice);
        await BluetoothEscposPrinter.printColumn(
          [30],
          [BluetoothEscposPrinter.ALIGN.LEFT],
          [row.name],
          {},
        );

        await BluetoothEscposPrinter.printColumn(
          [10, 1, 10, 11],
          [
            BluetoothEscposPrinter.ALIGN.RIGHT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          [row.quantity.toString(), 'x', price, total],
          {},
        );
      }

      // Footer
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT,
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );

      const totalCheckout = formatUang(checkoutLatest.totalPrice);

      const footerData = [['TOTAL', totalCheckout]];

      for (const [label, value] of footerData) {
        await BluetoothEscposPrinter.printColumn(
          [19, 2, 11],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          [label, ':', value],
          {},
        );
      }

      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );
      await BluetoothEscposPrinter.printText(`Terima Kasih\r\n`, {
        fonttype: 1,
      });
      await BluetoothEscposPrinter.printText(' \r\n', {});
      setLoading(false);
    } catch (error) {
      setLoading(false);
      modalError('Bluetooth tidak terhubung');
    }
  };

  return (
    <StrukComponent
      photoUrl={photoUrl}
      storePhone={storePhone}
      storeAddress={storeAddress}
      checkoutLatest={checkoutLatest}
      captureView={captureView}
      viewShotRefStruk={viewShotRefStruk}
      deviceTerhubung={deviceTerhubung}
      printLabel={printLabel}
      showModalCetak={showModalCetak}
      setShowModalCetak={setShowModalCetak}
      storeName={storeName}
      loading={loading}
    />
  );
};

export default StrukContainer;
