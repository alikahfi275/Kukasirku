import React, {useEffect} from 'react';
import HomeComponent from '../components/HomeComponent';
import {getAllProducts} from '../store/HomeService';
import {useHomeStore} from '../store/useHomeStore';
import {BluetoothManager} from '@brooons/react-native-bluetooth-escpos-printer';
import {useProfileStore} from '../../Profile/store/useProfileStore';
import {getStoreProfile} from '../../Profile/store/ProfileService';

const HomeContainer: React.FC = () => {
  const {isBluetoothEnabled} = useProfileStore();
  const {products, setProducts, searchQuery} = useHomeStore();
  const loadProducts = async () => {
    try {
      const result: any = await getAllProducts();
      setProducts(result);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  const checkBluetoothConnect = async () => {
    try {
      const profile = await getStoreProfile();
      const addressCheck: any =
        await BluetoothManager.getConnectedDeviceAddress();

      if (profile !== null && profile?.deviceTerhubung !== '') {
        await BluetoothManager.disconnect(profile?.deviceTerhubung);
        if (addressCheck === '' && isBluetoothEnabled) {
          await BluetoothManager.connect(profile?.deviceTerhubung);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    checkBluetoothConnect();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [products]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return <HomeComponent filteredProducts={filteredProducts} />;
};

export default HomeContainer;
