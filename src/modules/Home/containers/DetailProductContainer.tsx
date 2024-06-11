import React, {useEffect, useState} from 'react';
import DetailProductComponent from '../components/DetailProductComponent';
import {useRoute} from '@react-navigation/native';
import {getProductById} from '../../../components';
import {useHomeStore} from '../store/useHomeStore';

const DetailProductContainer = () => {
  const route = useRoute<any>();
  const {itemId} = route.params;
  const {productById, setProductById} = useHomeStore();

  const fetchProduct = async () => {
    try {
      const result: any = await getProductById(itemId);
      console.log(result);
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
