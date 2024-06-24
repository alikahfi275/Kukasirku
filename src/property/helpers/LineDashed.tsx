import React from 'react';
import {CView} from '../../components';
import {colors} from '../utils';

const LineDashed = props => {
  return (
    <CView
      style={{
        borderTopWidth: 1,
        borderStyle: 'dashed',
        borderColor: colors.secondary2,
      }}
      {...props}
    />
  );
};

export default LineDashed;
