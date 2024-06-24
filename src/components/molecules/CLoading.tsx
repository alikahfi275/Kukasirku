import React from 'react';
import {View, StyleSheet, Modal, ActivityIndicator, Text} from 'react-native';
import {colors} from '../../property';
import {CText} from '../atoms';

const CLoading = ({visible}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={visible}
            size="large"
            color={colors.teal}
          />
          <CText fontSize={16} weight={300} color={colors.teal} marginLeft={10}>
            Loading ...
          </CText>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 60,
    width: 150,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});

export default CLoading;
