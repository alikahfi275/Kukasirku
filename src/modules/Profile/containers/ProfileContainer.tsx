import React, {FC, useEffect} from 'react';
import ProfileComponent from '../components/ProfileComponent';
import {PermissionsAndroid} from 'react-native';

const ProfileContainer: FC = () => {
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
  return <ProfileComponent />;
};

export default ProfileContainer;
