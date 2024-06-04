import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import CView from './CView';
import CText from './CText';
import {horizontalScale, verticalScale} from '../../property';

interface ReusableTextInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
}

const CTextInput: React.FC<ReusableTextInputProps> = ({
  label,
  containerStyle,
  labelStyle,
  inputStyle,
  ...props
}) => {
  return (
    <CView marginTop={8} marginBottom={8} style={containerStyle}>
      {label && (
        <CText marginBottom={4} fontSize={16} color={'#333'} style={labelStyle}>
          {label}
        </CText>
      )}
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            height: verticalScale(40),
            paddingLeft: horizontalScale(10),
          },
          inputStyle,
        ]}
        {...props}
      />
    </CView>
  );
};

export default CTextInput;
