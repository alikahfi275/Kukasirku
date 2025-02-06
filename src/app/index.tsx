import React, {FC, useEffect, useState} from 'react';
import {ModalSucces} from '../components';
import {createModalStack, ModalProvider} from 'react-native-modalfy';
import {Dimensions} from 'react-native';
import {Easing} from 'react-native-reanimated';
import Stacks from './routes/Stacks';
import {DatabaseProvider} from '@nozbe/watermelondb/DatabaseProvider';
import {database} from './database';
import {getStoreProfile} from '../modules/Profile/store/ProfileService';
import Route from './routes/Routes';
import DeviceInfo from 'react-native-device-info';
import {accesCode} from './accesCode';

const screenHeight = Dimensions.get('screen').height;

const modalConfig = {
  ModalSucces,
};

const defaultOptions = {
  backBehavior: 'none', // to disable back button & outside touches
  disableFlingGesture: true, // optionally: to disable fling-to-close gesture
  backdropOpacity: 0.7,
  animateInConfig: {
    easing: Easing.inOut(Easing.exp),
    duration: 900,
  },
  animateOutConfig: {
    easing: Easing.inOut(Easing.exp),
    duration: 900,
  },
  transitionOptions: (animatedValue: any) => ({
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [screenHeight, 0, screenHeight],
        }),
      },
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 1, 0.9],
        }),
      },
    ],
  }),
};

const stack = createModalStack(modalConfig, defaultOptions);
const App: FC = () => {
  useEffect(() => {
    const fetchStoreProfile = async () => {
      try {
        const device = DeviceInfo.getModel();
        const profile = await getStoreProfile();

        if (device.toLowerCase() === accesCode.device.toLowerCase()) {
          if (profile?.isAccess) {
            Route.navigate(Route.BottomTab);
          } else {
            Route.navigate(Route.Access);
          }
        } else {
          Route.navigate(Route.NotAccess);
        }
      } catch (error) {}
    };

    fetchStoreProfile();
  }, []);
  return (
    <DatabaseProvider database={database}>
      <ModalProvider stack={stack}>
        <Stacks />
      </ModalProvider>
    </DatabaseProvider>
  );
};

export default App;
