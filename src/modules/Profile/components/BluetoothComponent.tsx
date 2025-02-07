import React from 'react';
import {FlatList} from 'react-native';
import {
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

const BluetoothComponent = (props: any) => {
  const {
    toggleBluetooth,
    startScanning,
    connectToDevice,
    isScanning,
    modalVisible,
    isLoading,
    setModalVisible,
    devices,
    disconnectFromDevice,
  } = props;

  const devicesName = devices
    .filter((device: any) => device.name) // Hanya ambil yang `name`-nya ada
    .map((device: any) => device.name);

  const {isBluetoothEnabled, connectedDevice} = useProfileStore();

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
      {connectToDevice === '' && (
        <CView
          flexDirection="row"
          marginLeft={20}
          paddingTop={15}
          paddingBottom={15}
          style={{borderBottomWidth: 1, borderBottomColor: '#E4E4E4'}}
          alignItems="center">
          <CButton
            title={'Disconnect'}
            onPress={disconnectFromDevice}
            style={{
              flex: 1,
              backgroundColor: isBluetoothEnabled
                ? colors.red1
                : colors.limegreen,
            }}
            marginRight={15}
          />
        </CView>
      )}

      {devices.length > 0 && (
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
      )}

      {devicesName.length === 0 && (
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
  );
};

export default BluetoothComponent;
