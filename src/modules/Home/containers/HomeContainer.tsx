import React, {useEffect, useState} from 'react';
import HomeComponent from '../components/HomeComponent';
import Product from '../../../app/database/model/Product';
import {getAllProducts} from '../../../components';

interface item {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}
interface HomeContainerProps {
  products: item[];
}
const HomeContainer: React.FC<HomeContainerProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const result = await getAllProducts();
      setProducts(result);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [products]);

  return <HomeComponent products={products} />;
};

export default HomeContainer;
