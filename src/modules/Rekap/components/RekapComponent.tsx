// App.js
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CModal from '../../../components/molecules/CModal';

const RekapComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Modal Example</Text>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Show Modal</Text>
      </TouchableOpacity>
      <CModal
        visible={modalVisible}
        onClose={closeModal}
        Title="Apakah Anda yakin ingin menghapus ?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RekapComponent;
