import React, {useEffect, useState} from 'react';
import BluetoothComponent from '../components/BluetoothComponent';
import {
  createConfigBluetooth,
  getStoreProfile,
  updateConfigBluetooth,
} from '../store/ProfileService';
import {useProfileStore} from '../store/useProfileStore';
import {BluetoothManager} from '@brooons/react-native-bluetooth-escpos-printer';
import {AlertError, AlertSuccsess} from '../../../components';

const BluetoothContainer = () => {
  const [id, setId] = useState('');
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

  useEffect(() => {
    const fetchStoreProfile = async () => {
      try {
        const profile = await getStoreProfile();
        if (profile) {
          setId(profile.id);
          setConnectedDevice(profile.deviceTerhubung);
        }
      } catch (error) {}
    };

    fetchStoreProfile();
  }, [id]);

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
        AlertError('Gagal Mencari Perangkat');
      } finally {
        setIsScanning(false);
      }
    }
  };

  const connectToDevice = async (address: string) => {
    setIsLoading(true);
    try {
      await BluetoothManager.connect(address);
      setConnectedDevice(address);
      if (id) {
        await updateConfigBluetooth(id, address);
      } else {
        await createConfigBluetooth(address);
      }
      setIsLoading(false);
      AlertSuccsess('Berhasil Menghubungkan');
    } catch (error) {
      setIsLoading(false);
      if (id) {
        await updateConfigBluetooth(id, '');
      } else {
        await createConfigBluetooth('');
      }
      AlertError('Gagal Menghubungkan');
    }
  };

  const disconnectFromDevice = async () => {
    try {
      await BluetoothManager.disconnect(connectedDevice);
      await updateConfigBluetooth(id, '');
      setConnectedDevice('');
    } catch (error) {}
  };

  return (
    <BluetoothComponent
      toggleBluetooth={toggleBluetooth}
      startScanning={startScanning}
      connectToDevice={connectToDevice}
      isScanning={isScanning}
      devices={devices}
      modalVisible={modalVisible}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      setModalVisible={setModalVisible}
      disconnectFromDevice={disconnectFromDevice}
    />
  );
};

export default BluetoothContainer;
