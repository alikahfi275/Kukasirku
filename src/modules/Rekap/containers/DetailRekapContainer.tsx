import React, {useCallback, useRef, useState} from 'react';
import DetailRekapComponent from '../components/DetailRekapComponent';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {modalError, modalSuccess} from '../../../components';
import {useRekapStore} from '../store/useRekapStore';
import {BluetoothEscposPrinter} from '@brooons/react-native-bluetooth-escpos-printer';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {formatRupiah, formatUang} from '../../../property/helpers/Helpers';
import moment from 'moment';
import {getStoreProfile} from '../../Profile/store/ProfileService';

const DetailRekapContainer: React.FC = () => {
  const viewShotRef = useRef(null);
  const [imageViewShot, setimageViewShot] = useState<string>('');
  const {productCounts, totalProducts, totalPrice, setLoading} =
    useRekapStore();
  const [deviceTerhubung, setDeviceTerhubung] = useState('');
  const [showModalCetak, setShowModalCetak] = useState<boolean>(false);
  const {params} = useRoute<any>();
  const {month} = params;

  const captureView = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: 'jpg',
        quality: 0.8,
      });
      setimageViewShot(uri);
      const filePath = `${
        RNFS.PicturesDirectoryPath
      }/capture_${Date.now()}.jpg`;
      await RNFS.copyFile(uri, filePath);
      modalSuccess('Berhasil disimpan digallery');
    } catch (error) {
      modalError('Gagal disimpan digallery');
    }
  };
  useFocusEffect(
    useCallback(() => {
      const fetchStoreProfile = async () => {
        try {
          const profile = await getStoreProfile();
          if (profile) {
            setDeviceTerhubung(profile.deviceTerhubung);
          }
        } catch (error) {
          console.error('Failed to fetch store profile', error);
        }
      };

      fetchStoreProfile();
    }, []),
  );
  const processedData = Object.entries(productCounts).map(
    ([name, details]) => ({
      name: name,
      count: details.count,
      totalPrice: details.totalPrice,
    }),
  );

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
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.printText(
        `REKAP BULAN ${month.toUpperCase()}\r\n`,
        {},
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      const labelHeader = [['Qty', 'Name', 'Total']];

      for (const [qty, name, total] of labelHeader) {
        await BluetoothEscposPrinter.printColumn(
          [10, 10, 10, 10, 10],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.CENTER,
            BluetoothEscposPrinter.ALIGN.RIGHT,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          [qty, '|', name, '|', total],
          {},
        );
      }
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );

      for (const row of processedData) {
        const totalPrice = formatUang(row.totalPrice);
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
          [row.count.toString(), '', row.name, totalPrice],
          {},
        );
      }

      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );

      const totalProduct = [['TOTAL PRODUCT', totalProducts.toString()]];

      for (const [label, value] of totalProduct) {
        await BluetoothEscposPrinter.printColumn(
          [19, 2, 11],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          [label, '|', value],
          {},
        );
      }

      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );

      const totalPendapatan = [['TOTAL PRODUCT', formatRupiah(totalPrice)]];

      for (const [label, value] of totalPendapatan) {
        await BluetoothEscposPrinter.printColumn(
          [19, 2, 11],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          [label, '|', value],
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

      await BluetoothEscposPrinter.printText(
        `Print : ${moment(new Date()).format('DD-MMM-YYYY HH:mm')}\r\n`,
        {fonttype: 1},
      );

      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );

      await BluetoothEscposPrinter.printText(
        `Powered By Akael Xd Project\r\n`,
        {},
      );

      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );

      await BluetoothEscposPrinter.printText('\r\n', {});
      setLoading(false);
    } catch (error) {
      setLoading(false);
      modalError('Bluetooth tidak terhubung');
    }
  };

  return (
    <DetailRekapComponent
      captureView={captureView}
      viewShotRef={viewShotRef}
      setShowModalCetak={setShowModalCetak}
      showModalCetak={showModalCetak}
      printLabel={printLabel}
    />
  );
};

export default DetailRekapContainer;
