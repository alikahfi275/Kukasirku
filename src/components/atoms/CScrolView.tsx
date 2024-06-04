import React, {ReactNode} from 'react';
import {ScrollView, View, ViewStyle} from 'react-native';
import {horizontalScale, verticalScale} from '../../property';

interface CViewProps {
  children?: ReactNode;
  style?: ViewStyle;
  borderRadius?: number | undefined;
  flex?: number | undefined;
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
  backgroundColor?: string;
}

const CScrolView: React.FC<CViewProps> = props => {
  const {children, style, backgroundColor = 'white'} = props;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={[
        {
          flex: props.flex,
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
        },
        style,
      ]}>
      {children}
    </ScrollView>
  );
};

export default CScrolView;
