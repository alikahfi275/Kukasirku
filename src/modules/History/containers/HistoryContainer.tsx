import React, {FC, useEffect} from 'react';
import HistoryComponent from '../components/HistoryComponent';
import {transformCheckoutData} from '../../../property';
import {useHistoryStore} from '../store/useHistoryStore';
import {Checkout} from '../store/type';
import {getAllCheckouts} from '../store/HistoryService';

const HistoryContainer: FC = () => {
  const {checkouts, setCheckouts, searchQueryHistory} = useHistoryStore();

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const rawCheckouts = await getAllCheckouts();
        const transformedCheckouts: Checkout[] =
          transformCheckoutData(rawCheckouts);
        setCheckouts(transformedCheckouts);
      } catch (error) {}
    };
    fetchCheckouts();
  }, [checkouts]);

  const isToday = (date: string) => {
    const today = new Date();
    const checkoutDate = new Date(date);
    return (
      today.getFullYear() === checkoutDate.getFullYear() &&
      today.getMonth() === checkoutDate.getMonth() &&
      today.getDate() === checkoutDate.getDate()
    );
  };

  const filteredCheckouts = checkouts.filter(
    checkout =>
      checkout.orderId
        .toLowerCase()
        .includes(searchQueryHistory.toLowerCase()) && isToday(checkout.date),
  );

  return <HistoryComponent filteredCheckouts={filteredCheckouts} />;
};

export default HistoryContainer;
