// components/ProductList.tsx
import React from 'react';
import {View, Text, Button, StyleSheet, FlatList, Image} from 'react-native';
import Product from '../../../app/database/model/Product';
import {deleteProduct} from '../../Profile/store/ProfileActions';
import {DefaulFood, colors, sizeScale} from '../../../property';

interface Props {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: () => void;
}

const ProductList: React.FC<Props> = ({products, onEdit, onDelete}) => {
  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    onDelete();
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Image
            source={item.imageUrl ? {uri: item.imageUrl} : DefaulFood}
            style={styles.image}
          />
          <Text>Name: {item.name}</Text>
          <Text>Price: {item.price}</Text>
          <Text>Description: {item.description}</Text>
          <Button title="Edit" onPress={() => onEdit(item.id)} />
          <Button title="Delete" onPress={() => handleDelete(item.id)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  image: {
    width: sizeScale(200),
    height: sizeScale(200),
    backgroundColor: colors.lightgray,
    borderRadius: sizeScale(5),
  },
});

export default ProductList;
