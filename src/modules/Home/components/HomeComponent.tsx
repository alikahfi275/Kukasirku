import React, {FC} from 'react';
import {CView, CHeader, CText, ListProduct} from '../../../components';
import {StyleSheet} from 'react-native';

const HomeComponent: FC = () => {
  return (
    <CView flex={1}>
      <CHeader typeHeader="search" />
      <ListProduct />
    </CView>
  );
};

const styles = StyleSheet.create({});

export default HomeComponent;
