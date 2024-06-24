import React, {useEffect} from 'react';
import DetailProductComponent from '../components/DetailProductComponent';
import {useRoute} from '@react-navigation/native';
import {getProductById} from '../store/HomeService';
import {useHomeStore} from '../store/useHomeStore';
import {Product} from '../store/type';

const DetailProductContainer: React.FC = () => {
  const route = useRoute<any>();
  const {itemId} = route.params;
  const {productById, setProductById} = useHomeStore();

  const fetchProduct = async () => {
    try {
      const result: any = await getProductById(itemId);
      setProductById(result);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [itemId]);
  return <DetailProductComponent item={productById} />;
};

export default DetailProductContainer;
