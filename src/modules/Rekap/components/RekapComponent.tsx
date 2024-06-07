// App.tsx
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Button, StyleSheet} from 'react-native';
import ProductList from './ProductList';
import {getAllProducts} from '../../Profile/store/ProfileActions';
import Product from '../../../app/database/model/Product';

const RekapComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadProducts = async () => {
    const result = await getAllProducts();
    setProducts(result);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Add Product" onPress={() => setEditingId(null)} />

      <ProductList
        products={products}
        onEdit={id => setEditingId(id)}
        onDelete={loadProducts}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default RekapComponent;
