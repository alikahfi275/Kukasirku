import React from 'react';
import {CHeader, CView, ListMonths} from '../../../components';

const RekapComponent: React.FC = () => {
  return (
    <CView flex={1}>
      <CHeader titleHeader="Rekap" typeHeader="noPrimary" />
      <ListMonths />
    </CView>
  );
};

export default RekapComponent;
