import React, {FC, useEffect} from 'react';
import {
  CHeader,
  CStatusbar,
  CText,
  CView,
  ListMenuProfile,
} from '../../../components';
import CImageProfile from '../../../components/organisms/CImageProfile';
import {colors} from '../../../property';
import {PermissionsAndroid} from 'react-native';

const ProfileComponent: FC = () => {
  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
    }
  };

  useEffect(() => {
    requestCameraPermission();
  });
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
