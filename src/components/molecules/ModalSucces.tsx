import {Dimensions, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CIcon, CText} from '../atoms';
import {colors} from '../../property';
import Route from '../../app/routes/Routes';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const ModalSuccess = ({modal: {getParam}}: any) => {
  const message = getParam('message');
  const onOk = getParam('onOk');
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        width: screenWidth / 1.5,
        height: screenHeight / 4,
        padding: 16,
        borderRadius: 10,
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <CIcon
          name="check-circle"
          type="MaterialCommunityIcons"
          size={40}
          color={colors.beige}
        />
        <CText>Success</CText>
        <CText>{message}</CText>
        <View style={{bottom: 0, position: 'absolute', width: '100%'}}>
          <TouchableOpacity
            onPress={() => {
              onOk ? onOk() : Route.closeModal('SuccessModal');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ModalSuccess;
