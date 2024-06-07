import React from 'react';
import {
  CHeader,
  CImageProfile,
  CView,
  ListMenuProfile,
} from '../../../components';
import {colors} from '../../../property';

const ProfileComponent: React.FC = () => {
  return (
    <CView
      flex={1}
      backgroundColorStatusBar={colors.teal}
      barStyle="light-content">
      <CHeader iconLeft="arrow-left" titleHeader="Profile" />
      <CImageProfile />
      <ListMenuProfile />
    </CView>
  );
};

export default ProfileComponent;
