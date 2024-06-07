import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {CText} from '../atoms';
import {colors, horizontalScale, verticalScale} from '../../property';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loadingColor?: string;
  fontSize?: number;
  weight?: number;
  color?: string;
  marginVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
}

const CButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style = {},
  textStyle = {},
  loadingColor = '#fff',
  fontSize = 14,
  weight = 600,
  color = '#fff',
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          marginVertical: verticalScale(props.marginVertical || 0),
          marginHorizontal: horizontalScale(props.marginHorizontal || 0),
          marginTop: verticalScale(props.marginTop || 0),
          marginBottom: verticalScale(props.marginBottom || 0),
          marginLeft: horizontalScale(props.marginLeft || 0),
          marginRight: horizontalScale(props.marginRight || 0),
          paddingTop: verticalScale(props.paddingTop || 0),
          paddingBottom: verticalScale(props.paddingBottom || 0),
          paddingLeft: horizontalScale(props.paddingLeft || 0),
          paddingRight: horizontalScale(props.paddingRight || 0),
          paddingVertical: verticalScale(props.paddingVertical || 0),
          paddingHorizontal: horizontalScale(props.paddingHorizontal || 0),
        },
        styles.button,
        style,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading ? (
        <ActivityIndicator size="small" color={loadingColor} />
      ) : (
        <CText fontSize={fontSize} weight={weight} color={color}>
          {title}
        </CText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.teal,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(30),
  },
  disabled: {
    backgroundColor: '#d3d3d3',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CButton;
