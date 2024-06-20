import React, {useEffect, useState} from 'react';
import ProfileComponent from '../components/ProfileComponent';
import {PermissionsAndroid} from 'react-native';
import {getStoreProfile} from '../store/ProfileService';
import {ProfileContainerProps} from '../store/type';

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
  useEffect(() => {
    const fetchStoreProfile = async () => {
      try {
        const profile = await getStoreProfile();
        if (profile) {
          setPhotoUrl(profile.photoUrl);
        }
      } catch (error) {}
    };

    fetchStoreProfile();
  }, [photoUrl]);

  useEffect(() => {
    requestCameraPermission();
  });
  return <ProfileComponent photoUrl={photoUrl} />;
};

export default ProfileContainer;
