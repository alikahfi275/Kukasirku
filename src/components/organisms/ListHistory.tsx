import React, {useCallback, useState} from 'react';
import {CButton, CScrolView, CText, CView} from '../atoms';
import moment from 'moment';
import ListItemsCheckout from './ListItemsCheckout';
import {colors, formatRupiah} from '../../property';
import {useFocusEffect} from '@react-navigation/native';
import {getStoreProfile} from '../../modules/Profile/store/ProfileService';
import {CLoading, CModal} from '../molecules';
import Route from '../../app/routes/Routes';
import {BluetoothEscposPrinter} from '@brooons/react-native-bluetooth-escpos-printer';
import {getCheckoutItemsByCheckoutId} from '../../modules/History/store/HistoryService';
import {formatUang} from '../../property/helpers/Helpers';

const ListHistory = ({checkouts}: {checkouts: any[]}) => {
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [storePhone, setStorePhone] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeName, setStoreName] = useState('');
  const [deviceTerhubung, setDeviceTerhubung] = useState('');
  const [showModalCetak, setShowModalCetak] = useState(false);

  const [loading, setLoading] = useState(false);

  const filterBase64 = photoUrl.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

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

  const printLabel = async (checkout: any) => {
    if (!deviceTerhubung) {
      setShowModalCetak(true);
      return;
    }
    setLoading(true);
    const itemsData: any = await getCheckoutItemsByCheckoutId(checkout.id);
    if (itemsData.length > 0) {
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

        await BluetoothEscposPrinter.printText(`${checkout.orderId}\r\n`, {
          fonttype: 1,
        });
        await BluetoothEscposPrinter.printText(
          `${moment(checkout.date).format('DD MMMM YYYY HH:mm')}\r\n`,
          {fonttype: 1},
        );
        await BluetoothEscposPrinter.printText(
          '--------------------------------\r\n',
          {},
        );

        for (const row of itemsData) {
          const price = formatUang(row.price);
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
            [row.quantity.toString(), 'x', price, price],
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

        const totalCheckout = formatUang(checkout.totalPrice);

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
        await BluetoothEscposPrinter.printText(`Terima Kasih\r\n`, {});
        await BluetoothEscposPrinter.printText('\r\n', {});
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };
  return (
    <CScrolView paddingBottom={30} paddingTop={10}>
      <CLoading visible={loading} />
      <CModal
        visible={showModalCetak}
        onConfirm={() => {
          Route.navigate(Route.BluetoothPrint);
          setShowModalCetak(false);
        }}
        onClose={() => setShowModalCetak(false)}
        Title="Harap Koneksikan Ke Printer Bluetooth"
      />
      {checkouts.map(checkout => (
        <CView
          key={checkout.id}
          marginBottom={20}
          padding={8}
          marginRight={20}
          marginLeft={20}
          marginTop={2}
          backgroundColor="white"
          style={{
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}>
          <CView
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <CView>
              <CText fontSize={16} weight={600}>
                {checkout.orderId}
              </CText>
              <CText>
                {moment(checkout.date).format('DD MMMM YYYY HH:mm')}
              </CText>
            </CView>
            <CButton
              title="Cetak"
              onPress={() => printLabel(checkout)}
              paddingLeft={20}
              paddingRight={20}
            />
          </CView>

          <CView
            marginTop={5}
            style={{
              borderTopWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.secondary2,
            }}
          />
          <ListItemsCheckout checkoutId={checkout.id} />
          <CView
            marginTop={5}
            style={{
              borderTopWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.secondary2,
            }}
          />
          <CView flexDirection="row" marginTop={5}>
            <CView flex={1}>
              <CText
                fontSize={16}
                style={{textAlign: 'right'}}
                weight={600}
                marginRight={10}>
                Total
              </CText>
            </CView>
            <CView style={{justifyContent: 'flex-start'}} flex={0.5}>
              <CText fontSize={16} weight={600}>
                {formatRupiah(checkout.totalPrice)}
              </CText>
            </CView>
          </CView>
        </CView>
      ))}
    </CScrolView>
  );
};

export default ListHistory;
