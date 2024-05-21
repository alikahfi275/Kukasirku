import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../../property';
import CStatusbar from './CStatusBar';

interface CViewProps {
  children?: ReactNode;
  style?: ViewStyle;
  borderRadius?: number | undefined;
}

const CView: React.FC<CViewProps> = ({children, style, borderRadius}) => {
  return (
    <View style={[styles.container, style]}>
      <CStatusbar backgroundColor={colors.white} barStyle="dark-content" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});

export default CView;
