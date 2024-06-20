import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Pressable,
} from 'react-native';
import {getCheckoutsByMonth} from '../store/RekapService'; // Pastikan jalur impor benar

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const RekapComponent = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [productCount, setProductCount] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCheckouts = async () => {
      setLoading(true);
      try {
        const {productCount, totalPrice} = await getCheckoutsByMonth(
          selectedMonth,
        );
        setProductCount(productCount);
        setTotalPrice(totalPrice);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch checkouts');
      } finally {
        setLoading(false);
      }
    };

    fetchCheckouts();
  }, [selectedMonth]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {months.map((month, index) => (
          <Button
            key={index}
            title={month}
            onPress={() => setSelectedMonth(index)}
            color={selectedMonth === index ? 'blue' : 'gray'}
          />
        ))}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.summary}>
          <Text>Jumlah Produk: {productCount}</Text>
          <Text>Total Harga: {totalPrice}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summary: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default RekapComponent;
