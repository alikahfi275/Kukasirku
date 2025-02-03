import React, {useCallback, useState} from 'react';
import ProfileComponent from '../components/ProfileComponent';
import {PermissionsAndroid, Platform} from 'react-native';
import {getStoreProfile} from '../store/ProfileService';
import {ProfileContainerProps} from '../store/type';
import {useFocusEffect} from '@react-navigation/native';
import {useProfileStore} from '../store/useProfileStore';

const ProfileContainer: React.FC<ProfileContainerProps> = () => {
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const {
    setPermissionBluetooth,
    setPermissionBluetoothScan,
    setPermissionCamera,
    setPermissionLocation,
    permissionBluetooth,
    permissionLocation,
  } = useProfileStore();

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const grantedLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const grantedCamera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      const grantedBluetooth = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      );
      const grantedBluetoothScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      );

      if (grantedLocation === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionLocation(true);
      } else {
        setPermissionLocation(false);
      }
      if (grantedCamera === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionCamera(true);
      } else {
        setPermissionCamera(false);
      }
      if (grantedBluetooth === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionBluetooth(true);
      } else {
        setPermissionBluetooth(false);
      }
      if (grantedBluetoothScan === PermissionsAndroid.RESULTS.GRANTED) {
        setPermissionBluetoothScan(true);
      } else {
        setPermissionBluetoothScan(false);
      }
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

  useFocusEffect(
    useCallback(() => {
      requestPermission();
    }, [permissionBluetooth, permissionLocation]),
  );

  return <ProfileComponent photoUrl={photoUrl} />;
};

export default ProfileContainer;
