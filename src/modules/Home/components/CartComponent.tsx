import React from 'react';
import {Button} from 'react-native';
import {useCartStore} from '../store/useHomeStore';
import {CHeader, CText, CView, ListCart} from '../../../components';
import {colors, formatRupiah} from '../../../property';
import {handleCheckout} from '../store/HomeService';

const CartComponent: React.FC = () => {
  const {totalPrice} = useCartStore();

  return (
    <CView flex={1}>
      <CHeader titleHeader="Cart" typeHeader="noPrimary" />
      <ListCart />
      <CView>
        <CView
          flexDirection="row"
          justifyContent="space-between"
          paddingRight={15}
          paddingLeft={15}
          marginBottom={10}
          paddingTop={10}
          style={{borderTopWidth: 1, borderTopColor: colors.secondary1}}>
          <CText weight={600} color={colors.black} fontSize={18}>
            Total
          </CText>
          <CText weight={600} color={colors.black} fontSize={18}>
            {formatRupiah(totalPrice)}
          </CText>
        </CView>
        <CView marginBottom={25} marginRight={15} marginLeft={15}>
          <Button
            disabled={totalPrice === 0}
            title="Checkout"
            onPress={() => handleCheckout()}
            color={colors.teal}
          />
        </CView>
      </CView>
    </CView>
  );
};

export default CartComponent;
