import React, {useCallback, useEffect, useState} from 'react';
import ProfileComponent from '../components/ProfileComponent';
import {PermissionsAndroid} from 'react-native';
import {getStoreProfile} from '../store/ProfileService';
import {ProfileContainerProps} from '../store/type';
import {useFocusEffect} from '@react-navigation/native';

const ProfileContainer: React.FC<ProfileContainerProps> = () => {
  const [photoUrl, setPhotoUrl] = useState<string>('');

  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
    }
  };
  useFocusEffect(
    useCallback(() => {
      const fetchStoreProfile = async () => {
        try {
          const profile = await getStoreProfile();
          if (profile) {
            setPhotoUrl(profile.photoUrl);
          }
        } catch (error) {
          console.error('Failed to fetch store profile', error);
        }
      };

      fetchStoreProfile();
    }, []),
  );

  useEffect(() => {
    requestCameraPermission();
  });
  return <ProfileComponent photoUrl={photoUrl} />;
};

export default ProfileContainer;
