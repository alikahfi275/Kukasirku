import React, {useEffect, useState} from 'react';
import {getCheckoutItemsByCheckoutId} from '../molecules';
import {CText, CView} from '../atoms';
import {formatRupiah} from '../../property';

const ListItemsCheckout = ({checkoutId}: any) => {
  const [itemsCheckout, setLocalItemsCheckout] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData: any = await getCheckoutItemsByCheckoutId(checkoutId);
        setLocalItemsCheckout(itemsData);
      } catch (error) {
        console.error('Error fetching checkout items:', error);
      } finally {
      }
    };

    fetchItems();
  }, [checkoutId]);

  return (
    <CView marginTop={5}>
      {itemsCheckout.map(item => (
        <CView key={item.id} flexDirection="row">
          <CView flex={1} flexDirection="row">
            <CText style={{flex: 1}}>{item.name} </CText>
            <CText marginRight={10}>{item.quantity}x</CText>
          </CView>
          <CView style={{justifyContent: 'flex-start'}} flex={0.5}>
            <CText>{formatRupiah(item.price)}</CText>
          </CView>
        </CView>
      ))}
    </CView>
  );
};

export default ListItemsCheckout;
