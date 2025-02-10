import React from 'react';
import {Button} from 'react-native';
import {useCartStore} from '../store/useHomeStore';
import {
  CHeader,
  CLoading,
  CModal,
  CText,
  CView,
  ListCart,
} from '../../../components';
import {colors, formatRupiah} from '../../../property';

const CartComponent: React.FC = (props: any) => {
  const {totalPrice} = useCartStore();
  const {loading, handleSubmitCheckout, modalVisible, setModalVisible} = props;

  return (
    <CView flex={1}>
      <CHeader titleHeader="Cart" typeHeader="noPrimary" />
      <CLoading visible={loading} />
      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        Title="Apakah pesananya sudah sesuai ?"
        onConfirm={() => handleSubmitCheckout()}
      />
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
            onPress={() => setModalVisible(true)}
            color={colors.teal}
          />
        </CView>
      </CView>
    </CView>
  );
};

export default CartComponent;
