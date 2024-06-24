import React, {useCallback, useEffect, useRef, useState} from 'react';
import StrukComponent from '../components/StrukComponent';
import {useFocusEffect} from '@react-navigation/native';
import {getStoreProfile} from '../../Profile/store/ProfileService';
import {transformCheckoutData} from '../../../property';
import {getCheckoutsReverse} from '../store/HomeService';
import {PermissionsAndroid} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import {AlertError, AlertSuccsess} from '../../../components';

const StrukContainer = () => {
  const viewShotRefStruk = useRef(null);
  const [imageViewShot, setimageViewShot] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [storePhone, setStorePhone] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [listCheckout, setListCheckout] = useState([]);

  const checkoutLatest = listCheckout[0];

  useFocusEffect(
    useCallback(() => {
      const fetchStoreProfile = async () => {
        try {
          const profile = await getStoreProfile();
          if (profile) {
            setPhotoUrl(profile.photoUrl);
            setStorePhone(profile.storePhone);
            setStoreAddress(profile.storeAddress);
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
      const fetchCheckouts = async () => {
        try {
          const rawCheckouts = await getCheckoutsReverse();
          const transformedCheckouts: any = transformCheckoutData(rawCheckouts);
          if (transformedCheckouts) {
            setListCheckout(transformedCheckouts);
          }
        } catch (error) {}
      };
      fetchCheckouts();
    }, []),
  );

  const requestEksternalStoragePermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
    }
  };

  useEffect(() => {
    requestEksternalStoragePermission();
  });

  const captureView = async () => {
    try {
      const uri = await captureRef(viewShotRefStruk, {
        format: 'jpg',
        quality: 0.8,
      });
      setimageViewShot(uri);
      const filePath = `${
        RNFS.PicturesDirectoryPath
      }/capture_${Date.now()}.jpg`;
      await RNFS.copyFile(uri, filePath);
      AlertSuccsess('Berhasil Menyimpan Ke Gallery');
    } catch (error) {
      AlertError('Gagal Menyimpan Ke Gallery');
    }
  };

  return (
    <StrukComponent
      photoUrl={photoUrl}
      storePhone={storePhone}
      storeAddress={storeAddress}
      checkoutLatest={checkoutLatest}
      captureView={captureView}
      viewShotRefStruk={viewShotRefStruk}
    />
  );
};

export default StrukContainer;
