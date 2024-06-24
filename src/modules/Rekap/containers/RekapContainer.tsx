import React, {FC, useEffect} from 'react';
import RekapComponent from '../components/RekapComponent';
import {PermissionsAndroid} from 'react-native';
import {useRekapStore} from '../store/useRekapStore';
import {getCheckoutsByMonth} from '../store/RekapService';

const RekapContainer: FC = () => {
  const {
    selectedMonth,
    setProductCounts,
    setTotalProducts,
    setTotalPrice,
    setLoading,
  } = useRekapStore();
  const requestEksternalStoragePermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
    }
  };
  useEffect(() => {
    requestEksternalStoragePermission();
  });

  useEffect(() => {
    const fetchCheckouts = async () => {
      setLoading(true);
      setProductCounts({});
      setTotalProducts(0);
      setTotalPrice(0);
      try {
        const {productCount, totalPrice, itemSummaries} =
          await getCheckoutsByMonth(selectedMonth);
        setProductCounts(itemSummaries);
        setTotalProducts(productCount);
        setTotalPrice(totalPrice);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCheckouts();
  }, [selectedMonth]);
  return <RekapComponent />;
};

export default RekapContainer;
