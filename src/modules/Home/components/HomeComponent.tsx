import React, {FC} from 'react';
import {
  CView,
  CHeader,
  CText,
  ListProduct,
  CStatusbar,
} from '../../../components';
import {StyleSheet} from 'react-native';
import {colors} from '../../../property';

const HomeComponent: FC = () => {
  return (
    <CView
      flex={1}
      backgroundColorStatusBar={colors.white}
      barStyle="dark-content">
      <CHeader typeHeader="search" />
      <ListProduct />
    </CView>
  );
};

export default HomeComponent;
