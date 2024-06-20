import React, {useEffect, useState} from 'react';
import DeleteProductComponent from '../components/DeleteProductComponent';
import {itemDeleteProduct} from '../store/type';
import {getAllProducts} from '../store/ProfileService';

const DeleteProductContainer: React.FC = () => {
  const [products, setProducts] = useState<itemDeleteProduct[]>([]);

  const loadAllProducts = async () => {
    try {
      const result: any = await getAllProducts();
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
