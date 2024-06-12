import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {colors, horizontalScale, verticalScale} from '../../property';

interface CViewProps {
  children?: ReactNode;
  style?: ViewStyle;
  borderRadius?: number | undefined;
  flex?: number | undefined;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  backgroundColor?: string;
  borderWidth?: number;
  borderColor?: string;
  flexDirection?: 'row' | 'column' | 'column-reverse' | 'row-reverse';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}
const CView: React.FC<CViewProps> = ({
  children,
  style,
  borderRadius,
  flex,
  backgroundColor = colors.white,
  borderWidth,
  borderColor,
  flexDirection,
  alignItems,
  justifyContent,
  ...props
}) => {
  return (
    <View
      style={[
        {
          flex: flex,
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
          backgroundColor: backgroundColor,
          borderRadius: borderRadius || 0,
          borderWidth: borderWidth,
          borderColor: borderColor,
          flexDirection: flexDirection,
          alignItems: alignItems,
          justifyContent: justifyContent,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default CView;
