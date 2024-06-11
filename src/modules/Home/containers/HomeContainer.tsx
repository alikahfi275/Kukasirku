import React, {useEffect} from 'react';
import HomeComponent from '../components/HomeComponent';
import {getAllProducts} from '../../../components';
import {HomeProps} from '../store/type';
import {useHomeStore} from '../store/useHomeStore';

const HomeContainer: React.FC<HomeProps> = () => {
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
    loadProducts();
  }, [products]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return <HomeComponent filteredProducts={filteredProducts} />;
};

export default HomeContainer;
