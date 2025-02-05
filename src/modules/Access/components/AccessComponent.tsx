import React, {useEffect, useState} from 'react';
import {CButton, CText, CTextInput, CView} from '../../../components';
import {colors} from '../../../property';
import {accesCode} from '../../../app/accesCode';
import DeviceInfo from 'react-native-device-info';
import Route from '../../../app/routes/Routes';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  createConfigAccess,
  getStoreProfile,
  updateConfigAccess,
} from '../../Profile/store/ProfileService';

const AccessComponent = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [deviceUser, setDeviceUser] = useState('');
  const [valueAccess, setValueAccess] = useState('');
  const [messageValidation, setMessageValidation] = useState('');
  const [id, setId] = useState('');

  const navigation = useNavigation();

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
    const getDevice = async () => {
      const device = await DeviceInfo.getManufacturer();
      setDeviceUser(device.toLowerCase());
    };
    getDevice();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === 'android') SplashScreen.hide();
    }, 500);
  }, []);

  const submitAccess = async () => {
    setMessageValidation('');
    setIsLoading(true);
    const isAccess = true;
    if (valueAccess === accesCode.code) {
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
  };

  return (
    <CView flex={1} paddingTop={35} justifyContent="center" alignItems="center">
      <CText
        weight={600}
        fontSize={30}
        marginBottom={10}
        color={colors.teal}
        style={{lineHeight: 30, letterSpacing: 2}}>
        KODE AKSES
      </CText>
      <CTextInput
        placeholder="Masukkan Kode Akses"
        inputStyle={{fontSize: 20}}
        placeholderTextColor={colors.lightgray}
        value={valueAccess}
        onChangeText={t => {
          setValueAccess(t);
          setMessageValidation('');
        }}
      />
      {messageValidation && (
        <CText weight={400} fontSize={16} color={colors.red}>
          {messageValidation}
        </CText>
      )}
      <CButton
        title="Masuk"
        color={colors.white}
        paddingRight={25}
        paddingLeft={25}
        marginTop={20}
        onPress={submitAccess}
        isLoading={isLoading}
      />
    </CView>
  );
};

export default AccessComponent;
