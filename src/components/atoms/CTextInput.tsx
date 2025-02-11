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
import {colors, horizontalScale, verticalScale} from '../../property';

interface ReusableTextInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  typeMultiline?: boolean;
  isMandatory?: boolean;
}

const CTextInput: React.FC<ReusableTextInputProps> = ({
  label,
  containerStyle,
  labelStyle,
  inputStyle,
  typeMultiline = false,
  isMandatory = false,
  ...props
}) => {
  return (
    <CView marginTop={2} marginBottom={5} style={containerStyle}>
      {label && (
        <CText marginBottom={4} fontSize={16} color={'#333'} style={labelStyle}>
          {label}{' '}
          {isMandatory && (
            <CText style={{color: colors.red1}}>(Wajib Diisi)</CText>
          )}
        </CText>
      )}
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            paddingLeft: horizontalScale(10),
            textAlignVertical: typeMultiline ? 'top' : 'center',
            textAlign: 'left',
            color: '#333',
          },
          inputStyle,
        ]}
        placeholderTextColor={'#999999'}
        {...props}
      />
    </CView>
  );
};

export default CTextInput;
