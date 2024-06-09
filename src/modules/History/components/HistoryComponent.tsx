import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import SweetAlert from 'react-native-sweet-alert';

const HistoryComponent = () => {
  const showConfirmationAlert = () => {
    SweetAlert.showAlertWithOptions(
      {
        title: 'Confirmation',
        subTitle: 'Are you sure you want to proceed?',
        confirmButtonTitle: 'Yes',
        confirmButtonColor: '#000',
        otherButtonTitle: 'No',
        otherButtonColor: '#dedede',
        style: 'default',
        cancellable: true,
      },
      callback => {
        if (callback === 'confirm') {
          console.log('User clicked Yes');
        } else {
          console.log('User clicked No');
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Show Confirmation Alert" onPress={showConfirmationAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HistoryComponent;
