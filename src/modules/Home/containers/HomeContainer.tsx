import React, {useEffect} from 'react';
import HomeComponent from '../components/HomeComponent';
import {getAllProducts} from '../store/HomeService';
import {useHomeStore} from '../store/useHomeStore';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const HomeContainer: React.FC = () => {
  const {products, setProducts, searchQuery} = useHomeStore();
  const loadProducts = async () => {
    try {
      const result: any = await getAllProducts();
      setProducts(result);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === 'android') SplashScreen.hide();
    }, 500);
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
