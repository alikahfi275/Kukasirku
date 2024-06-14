import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  getAllCheckouts,
  getCheckoutItemsByCheckoutId,
} from '../../../components/molecules/ProviderServices';
import {transformCheckoutData} from '../../../property/helpers/Helpers';
import moment from 'moment';

interface Checkout {
  id: string;
  orderId: string;
  totalPrice: number;
  date: Date;
}

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  checkoutId: string;
}

const RekapComponent = () => {
  const [checkouts, setCheckouts] = useState<Checkout[]>([]);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const rawCheckouts = await getAllCheckouts();
        const transformedCheckouts = transformCheckoutData(rawCheckouts);
        setCheckouts(transformedCheckouts);
      } catch (error) {
      } finally {
      }
    };

    fetchCheckouts();
  }, []);

  return (
    <ScrollView style={{padding: 20}}>
      <Text style={{fontSize: 24, marginBottom: 20}}>Checkout History</Text>
      {checkouts.map(checkout => (
        <View key={checkout.id} style={{marginBottom: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Order ID: {checkout.orderId}
          </Text>
          <Text>Total Price: ${checkout.totalPrice.toFixed(2)}</Text>
          <Text>
            Date: {moment(checkout.date).format('DD MMMM YYYY HH:mm')}
          </Text>
          <CheckoutItemsList checkoutId={checkout.id} />
        </View>
      ))}
    </ScrollView>
  );
};

const CheckoutItemsList = ({checkoutId}: {checkoutId: string}) => {
  const [items, setItems] = useState<CheckoutItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await getCheckoutItemsByCheckoutId(checkoutId);
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching checkout items:', error);
      }
    };

    fetchItems();
  }, [checkoutId]);

  return (
    <View style={{marginTop: 10}}>
      {items.map(item => (
        <View key={item.id} style={{marginBottom: 5}}>
          <Text>
            {item.name} - {item.quantity} x ${item.price.toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default RekapComponent;
