// components/CartComponent.tsx
import React from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {useCartStore} from '../store/useHomeStore';

const CartComponent: React.FC = () => {
  const {cart, removeFromCart, clearCart} = useCartStore();

  console.log(cart);

  return (
    <View style={{padding: 20}}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{marginBottom: 20}}>
            <Text>Nama :{item.name}</Text>
            <Text>Description :{item.description}</Text>
            <Text>Price :{item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />
      {cart.length > 0 && <Button title="Clear Cart" onPress={clearCart} />}
    </View>
  );
};

export default CartComponent;
