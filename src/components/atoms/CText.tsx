import React, {FC} from 'react';
import {Text, TextStyle, ViewStyle} from 'react-native';
import {
  colors,
  fontSizeScale,
  getFontFamily,
  horizontalScale,
  verticalScale,
} from '../../property';

interface Props {
  children: any;
  fontSize?: number;
  color?: string;
  weight?: number;
  style?: ViewStyle | TextStyle;
  marginVertical?: number;
  marginHorizontal?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
}

const CText: FC<Props> = props => {
  return (
    <Text
      style={[
        {
          fontSize: fontSizeScale(props.fontSize || 14),
          fontFamily: getFontFamily('Inter', props.weight),
          color: props.color || colors.black,
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
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};

export default CText;
