import React, {useState, useEffect} from 'react';
import {FlatList, Alert, StyleSheet} from 'react-native';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
} from '@brooons/react-native-bluetooth-escpos-printer';
import moment from 'moment';
import {
  AlertError,
  AlertSuccsess,
  CButton,
  CHeader,
  CLoading,
  CModal,
  CText,
  CView,
} from '../../../components';
import Route from '../../../app/routes/Routes';
import {colors} from '../../../property';
import {useProfileStore} from '../store/useProfileStore';

const BluetoothComponent = () => {
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isBluetoothEnabled,
    setIsBluetoothEnabled,
    connectedDevice,
    setConnectedDevice,
  } = useProfileStore();

  useEffect(() => {
    const checkBluetoothStatus = async () => {
      const enabled = await BluetoothManager.checkBluetoothEnabled();
      setIsBluetoothEnabled(enabled);
    };
    checkBluetoothStatus();
  }, []);

  const toggleBluetooth = async () => {
    if (isBluetoothEnabled) {
      await BluetoothManager.disableBluetooth();
      setIsBluetoothEnabled(false);
    } else {
      await BluetoothManager.enableBluetooth();
      setIsBluetoothEnabled(true);
    }
  };

  const startScanning = async () => {
    if (isBluetoothEnabled === false) {
      setModalVisible(true);
    } else {
      setIsScanning(true);
      try {
        const devices = await BluetoothManager.scanDevices();
        const parsedDevices = JSON.parse(devices);
        setDevices(parsedDevices.found);
      } catch (error) {
        Alert.alert('Error', 'Failed to scan devices');
      } finally {
        setIsScanning(false);
      }
    }
  };

  const connectToDevice = async address => {
    setIsLoading(true);
    try {
      await BluetoothManager.connect(address);
      setConnectedDevice(address);
      setIsLoading(false);
      AlertSuccsess('Berhasil Menghubungkan');
    } catch (error) {
      setIsLoading(false);
      AlertError('Gagal Menghubungkan');
    }
  };

  const printLabel = async () => {
    if (!connectedDevice) {
      Alert.alert('Error', 'No device connected');
      return;
    }

    const props = {
      dataitems: [
        {
          iname: 'Produk A',
          vol: 2,
          amount_price: 15000,
          amount_subtotal: 30000,
          tgltrans: '2025-01-30T12:00:00Z',
        },
        {
          iname: 'Produk B',
          vol: 1,
          amount_price: 50000,
          amount_subtotal: 50000,
          tgltrans: '2025-01-30T12:00:00Z',
        },
        {
          iname: 'Produk C',
          vol: 3,
          amount_price: 10000,
          amount_subtotal: 30000,
          tgltrans: '2025-01-30T12:00:00Z',
        },
      ],
      atasnama: 'PT. Contoh Abadi',
      nomorinv: 'INV-123456',
      databill: 110000,
    };

    const state = {
      configsLists: [
        {cname: 'namatoko', cdata: 'Toko Contoh Jaya'},
        {cname: 'alamattoko', cdata: 'Jl. Contoh Raya No. 123, Jakarta'},
        {cname: 'nomortlp', cdata: '081234567890'},
        {cname: 'noinv', cdata: 'INV-'},
        {cname: 'promo', cdata: 'Diskon Awal Tahun 2025!'},
        {cname: 'pic', cdata: ''},
      ],
      diskon: 10000,
      u_cash: 120000,
      u_kembali: 10000,
    };

    const dummyStore = {
      photoUrl: 'https://via.placeholder.com/150',
      storeName: 'Toko Contoh Doang',
      storeAddress: 'Jl. Contoh Raya No. 123, Jakarta',
      storePhone: '081234567890',
    };

    const {dataitems: rows, atasnama, nomorinv, databill} = props;
    const {configsLists: ddata, diskon, u_cash, u_kembali} = state;

    let tgltrans = rows[0]?.tgltrans || '';
    let noi = '';
    let promo = '';

    try {
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );

      await BluetoothEscposPrinter.printPic(dummyStore.photoUrl, {
        width: 100,
        left: 100,
      });

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER,
      );

      await BluetoothEscposPrinter.printText(`${dummyStore.storeName}\r\n`, {});
      await BluetoothEscposPrinter.printText(
        `${dummyStore.storeAddress}\r\n`,
        {},
      );
      await BluetoothEscposPrinter.printText(
        `${dummyStore.storePhone}\r\n`,
        {},
      );

      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT,
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );
      await BluetoothEscposPrinter.printText(`AKL_HSJKDB389GJBS26B37\r\n`, {
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

      // Detail Barang
      let totalItems = 0;

      for (const row of rows) {
        await BluetoothEscposPrinter.printColumn(
          [30],
          [BluetoothEscposPrinter.ALIGN.LEFT],
          [row.iname],
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
          [
            row.vol.toString(),
            'x',
            row.amount_price.toString(),
            row.amount_subtotal.toString(),
          ],
          {},
        );

        totalItems += parseFloat(row.vol);
      }

      // Footer
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.LEFT,
      );
      await BluetoothEscposPrinter.printText(
        '--------------------------------\r\n',
        {},
      );

      const footerData = [['TOTAL', databill]];

      for (const [label, value] of footerData) {
        await BluetoothEscposPrinter.printColumn(
          [19, 2, 11],
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          [label, ':', value.toString()],
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
        `Powered by Akael Xd Project\r\n`,
        {fonttype: 0.5},
      );
      await BluetoothEscposPrinter.printText(`Terima Kasih\r\n`, {
        fonttype: 0.5,
      });

      Alert.alert('Success', 'Receipt printed successfully');
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Error', 'Failed to print receipt');
    }
  };

  return (
    <CView flex={1}>
      <CHeader
        iconLeft="arrow-left"
        titleHeader="Bluetooth Printer"
        onPressLeft={() => Route.navigate(Route.Profile)}
      />
      <CLoading visible={isScanning || isLoading} />
      <CModal
        visible={modalVisible}
        Title="Aktifkan Bluetooth Terlebih Dahulu "
        onConfirm={() => setModalVisible(false)}
      />
      <CView
        flexDirection="row"
        marginRight={20}
        marginLeft={20}
        paddingTop={15}
        alignItems="center">
        <CText fontSize={18} weight={500} style={{flex: 1}}>
          Status Bluetooth :
        </CText>
        <CText
          fontSize={18}
          weight={600}
          color={isBluetoothEnabled ? colors.limegreen : colors.red1}>
          {isBluetoothEnabled ? 'Aktif' : 'Tidak Aktif'}
        </CText>
      </CView>
      <CView
        flexDirection="row"
        marginRight={20}
        marginLeft={20}
        paddingTop={15}
        paddingBottom={15}
        style={{borderBottomWidth: 1, borderBottomColor: '#E4E4E4'}}
        alignItems="center">
        <CText fontSize={18} weight={500} style={{flex: 1}}>
          Terhubung Ke :
        </CText>
        <CText
          fontSize={18}
          weight={600}
          color={connectedDevice ? colors.limegreen : colors.red1}>
          {connectedDevice ? connectedDevice : 'Tidak Ada'}
        </CText>
      </CView>
      {devices.length > 0 ? (
        <FlatList
          data={devices}
          keyExtractor={(item: any) => item.address}
          showsVerticalScrollIndicator={false}
          renderItem={({item}: any) =>
            item.name && (
              <CView
                marginRight={20}
                marginLeft={20}
                marginTop={15}
                borderRadius={10}
                borderWidth={1}
                padding={10}
                borderColor="#E4E4E4">
                <CText weight={300}>
                  {item.name} : ({item.address})
                </CText>
                <CButton
                  title="Connect"
                  onPress={() => connectToDevice(item.address)}
                  marginTop={10}
                />
              </CView>
            )
          }
        />
      ) : (
        <CView flex={1} justifyContent="center" alignItems="center">
          <CText weight={300} color={colors.secondary2}>
            Tidak Ada List Bluetooth
          </CText>
        </CView>
      )}

      <CView
        flexDirection="row"
        justifyContent="center"
        marginRight={20}
        marginLeft={20}
        marginBottom={20}
        marginTop={10}>
        <CButton
          title={isBluetoothEnabled ? 'Disable Bluetooth' : 'Enable Bluetooth'}
          onPress={toggleBluetooth}
          style={{
            flex: 1,
            backgroundColor: isBluetoothEnabled
              ? colors.red1
              : colors.limegreen,
          }}
          marginRight={15}
        />
        <CButton
          title="Scan Bluetooth"
          onPress={startScanning}
          style={{
            flex: 1,
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: colors.teal,
          }}
          marginLeft={15}
          color={colors.teal}
          disabled={isScanning}
        />
      </CView>
    </CView>
    // <View style={styles.container}>
    //   <Text style={styles.title}>Bluetooth Printer App</Text>

    //   <Button
    //     title={isBluetoothEnabled ? 'Disable Bluetooth' : 'Enable Bluetooth'}
    //     onPress={toggleBluetooth}
    //   />
    //   <Text style={styles.status}>
    //     Bluetooth is {isBluetoothEnabled ? 'Enabled' : 'Disabled'}
    //   </Text>

    //   <Button
    //     title="Start Scanning"
    //     onPress={startScanning}
    //     disabled={isScanning}
    //   />
    //   {isScanning && <Text>Scanning for devices...</Text>}

    //   <FlatList
    //     data={devices}
    //     keyExtractor={item => item.address}
    //     renderItem={({item}) => (
    //       <View style={styles.deviceItem}>
    //         <Text>
    //           {item.name || 'Unnamed Device'} ({item.address})
    //         </Text>
    //         <Button
    //           title="Connect"
    //           onPress={() => connectToDevice(item.address)}
    //         />
    //       </View>
    //     )}
    //   />

    //   {connectedDevice && (
    //     <View style={styles.connectedContainer}>
    //       <Text>Connected to: {connectedDevice}</Text>
    //       <Button title="Print Label" onPress={printLabel} />
    //     </View>
    //   )}
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginVertical: 10,
  },
  deviceItem: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  connectedContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default BluetoothComponent;
