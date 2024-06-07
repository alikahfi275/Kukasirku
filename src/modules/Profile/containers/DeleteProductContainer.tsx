import React, {useEffect, useState} from 'react';
import {getAllProducts} from '../../../components';
import DeleteProductComponent from '../components/DeleteProductComponent';
import {itemDeleteProduct} from '../store/type';

const DeleteProductContainer: React.FC = () => {
  const [products, setProducts] = useState<itemDeleteProduct[]>([]);

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

  return <DeleteProductComponent products={products} />;
};

export default DeleteProductContainer;
