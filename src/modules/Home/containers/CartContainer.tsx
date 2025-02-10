import React, {useState} from 'react';
import CartComponent from '../components/CartComponent';
import {handleCheckout} from '../store/HomeService';
import Route from '../../../app/routes/Routes';

const CartContainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmitCheckout = async () => {
    await handleCheckout(setLoading);
  };
  return (
    <CartComponent
      handleSubmitCheckout={handleSubmitCheckout}
      loading={loading}
    />
  );
};

export default CartContainer;
