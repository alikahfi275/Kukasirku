import React, {useEffect, useState} from 'react';
import AccessComponent from '../components/AccessComponent';
import {CommonActions, useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {
  createConfigAccess,
  getStoreProfile,
  updateConfigAccess,
} from '../../Profile/store/ProfileService';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {accessCode} from '../../../app/accessCode';
import {modalError} from '../../../components';
import Route from '../../../app/routes/Routes';

const AccessContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [valueAccess, setValueAccess] = useState('');
  const [messageValidation, setMessageValidation] = useState('');
  const [id, setId] = useState('');

  const navigation = useNavigation();

  const deviceModel = DeviceInfo.getModel();

  useEffect(() => {
    const fetchStoreProfile = async () => {
      try {
        const profile = await getStoreProfile();
        if (profile) {
          setId(profile.id);
        }
      } catch (error) {}
    };

    fetchStoreProfile();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === 'android') SplashScreen.hide();
    }, 500);
  }, []);

  const submitAccess = async () => {
    if (deviceModel !== accessCode.device) {
      modalError('Maaf Akses Anda Tidak Resmi');
    } else {
      setMessageValidation('');
      setIsLoading(true);
      const isAccess = true;
      if (valueAccess === accessCode.code) {
        if (id) {
          await updateConfigAccess(id, isAccess);
        } else {
          await createConfigAccess(isAccess);
        }
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: Route.BottomTab}],
          }),
        );
        setIsLoading(false);
        setMessageValidation('');
      } else {
        setMessageValidation('Kode Akses Salah');
        setIsLoading(false);
      }
    }
  };
  return (
    <AccessComponent
      isLoading={isLoading}
      valueAccess={valueAccess}
      setValueAccess={setValueAccess}
      messageValidation={messageValidation}
      setMessageValidation={setMessageValidation}
      submitAccess={submitAccess}
    />
  );
};

export default AccessContainer;
