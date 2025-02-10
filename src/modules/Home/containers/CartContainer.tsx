import React, {useState} from 'react';
import CartComponent from '../components/CartComponent';
import {handleCheckout} from '../store/HomeService';

const CartContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSubmitCheckout = async () => {
    setModalVisible(false);
    await handleCheckout(setLoading);
  };

  return (
    <CartComponent
      handleSubmitCheckout={handleSubmitCheckout}
      loading={loading}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default CartContainer;
