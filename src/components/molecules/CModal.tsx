// CustomModal.js
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, horizontalScale} from '../../property';
import {CText} from '../atoms';

interface CModalProps {
  visible: boolean;
  onClose: any;
  Title: string;
  onConfirm: any;
}

const CModal: React.FC<CModalProps> = ({
  visible,
  onClose,
  Title,
  onConfirm,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <CText fontSize={15}>{Title}</CText>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.closeButtonCancel}
              onPress={onClose}>
              <Text style={styles.closeButtonTextCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onConfirm}>
              <Text style={styles.closeButtonText}>Yes</Text>
            </TouchableOpacity>
          </View>
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
  closeButtonCancel: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.teal,
    borderRadius: 5,
    marginRight: horizontalScale(40),
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.teal,
    borderRadius: 5,
    marginLeft: horizontalScale(40),
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

export default CModal;
