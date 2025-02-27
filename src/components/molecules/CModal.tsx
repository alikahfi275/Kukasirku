// CustomModal.js
import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, horizontalScale} from '../../property';
import {CText} from '../atoms';

interface CModalProps {
  visible: boolean;
  onClose?: any;
  Title: string;
  onConfirm?: any;
  isOneButton?: boolean;
  onOneButton?: any;
  titleOneButton?: string;
}

const CModal: React.FC<CModalProps> = ({
  visible,
  onClose,
  Title,
  onConfirm,
  isOneButton,
  onOneButton,
  titleOneButton,
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
          {isOneButton ? (
            <TouchableOpacity
              onPress={onOneButton}
              style={{
                marginTop: 20,
                padding: 10,
                paddingHorizontal: 20,
                backgroundColor: colors.teal,
                borderRadius: 5,
                marginLeft: 'auto',
              }}>
              <CText style={styles.closeButtonText}>{titleOneButton}</CText>
            </TouchableOpacity>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: colors.teal,
                  borderRadius: 5,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: horizontalScale(10),
                }}
                onPress={onClose}>
                <Text style={styles.closeButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  marginTop: 20,
                  backgroundColor: colors.teal,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: horizontalScale(10),
                }}
                onPress={onConfirm}>
                <Text style={styles.closeButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          )}
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

export default CModal;
