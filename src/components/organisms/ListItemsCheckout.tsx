import React, {useEffect, useState} from 'react';
import {CText, CView} from '../atoms';
import {formatRupiah} from '../../property';
import {getCheckoutItemsByCheckoutId} from '../../modules/History/store/HistoryService';

type Item = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  checkoutId: string;
  productId: string;
  product: any;
};
interface ListItemsCheckoutProps {
  checkoutId: string;
}
const ListItemsCheckout: React.FC<ListItemsCheckoutProps> = ({checkoutId}) => {
  const [itemsCheckout, setLocalItemsCheckout] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (checkoutId) {
        try {
          const itemsData: any = await getCheckoutItemsByCheckoutId(checkoutId);
          setLocalItemsCheckout(itemsData);
        } catch (error) {
          console.error('Error fetching checkout items:', error);
        }
      }
    };
    fetchItems();
  }, [itemsCheckout.length, checkoutId]);

  return (
    <CView marginTop={5}>
      {itemsCheckout.map(item => {
        const totalPrice = item.price * item.quantity;
        return (
          <CView key={item.id} flexDirection="row">
            <CView flex={1} flexDirection="row">
              <CText style={{flex: 1}}>{item.name} </CText>
              <CText marginRight={10}>{item.quantity}x</CText>
            </CView>
            <CView style={{justifyContent: 'flex-start'}} flex={0.5}>
              <CText>{formatRupiah(item.price)}</CText>
            </CView>
            <CView style={{justifyContent: 'flex-start'}} flex={0.5}>
              <CText>{formatRupiah(totalPrice)}</CText>
            </CView>
          </CView>
        );
      })}
    </CView>
  );
};

export default ListItemsCheckout;
