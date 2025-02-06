// CustomModal.js
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, horizontalScale} from '../../property';
import {CButton, CIcon, CText} from '../atoms';

interface CModalProps {
  visible: boolean;
  onClose?: any;
  onConfirm?: any;
  isSuccess?: boolean;
}

const CModalSuccesFailed: React.FC<CModalProps> = ({
  visible,
  onClose,
  onConfirm,
  isSuccess = false,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <CIcon
            name={isSuccess ? 'check-circle' : 'close-circle'}
            size={200}
            color={isSuccess ? colors.chartreuse : colors.red1}
            style={{
              marginTop: -100,
              backgroundColor: 'white',
              borderRadius: 100,
            }}
          />
          <CText
            fontSize={25}
            weight={800}
            color={isSuccess ? colors.chartreuse : colors.red1}>
            {isSuccess ? 'Sukses' : 'Gagal'}
          </CText>
          <CButton
            title="OK"
            onPress={onConfirm}
            marginTop={20}
            marginBottom={10}
            style={{width: '100%'}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButtonTextCancel: {
    color: colors.teal,
    fontWeight: 'bold',
  },
});

export default CModalSuccesFailed;
