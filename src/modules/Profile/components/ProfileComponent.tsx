import React from 'react';
import {
  CHeader,
  CImageProfile,
  CView,
  ListMenuProfile,
} from '../../../components';

const ProfileComponent: React.FC = () => {
  return (
    <CView flex={1}>
      <CHeader iconLeft="arrow-left" titleHeader="Profile" />
      <CImageProfile />
      <ListMenuProfile />
    </CView>
  );
};

export default ProfileComponent;
