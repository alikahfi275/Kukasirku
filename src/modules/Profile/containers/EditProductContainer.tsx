import React, {useEffect, useState} from 'react';
import EditProductComponent from '../components/EditProductComponent';
import {getAllProducts} from '../../../components';
import {EditProductContainerProps, Item} from '../store/type';

const EditProductContainer: React.FC<EditProductContainerProps> = () => {
  const [products, setProducts] = useState<Item[]>([]);

  const loadAllProducts = async () => {
    try {
      const result = await getAllProducts();
      setProducts(result);
    } catch (err) {
      console.error('Failed to load products:', err);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, [products]);
  return <EditProductComponent products={products} />;
};

export default EditProductContainer;
