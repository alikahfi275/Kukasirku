import React, {FC} from 'react';
import {CText, CIcon, CView, CSearch, ModalSucces} from '../components';
import {createModalStack, ModalProvider} from 'react-native-modalfy';
import {Dimensions} from 'react-native';
import {Easing} from 'react-native-reanimated';
import Stacks from './routes/Stacks';
import {DatabaseProvider} from '@nozbe/watermelondb/DatabaseProvider';
import {database} from './database';

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
  return (
    <DatabaseProvider database={database}>
      <ModalProvider stack={stack}>
        <Stacks />
      </ModalProvider>
    </DatabaseProvider>
  );
};

export default App;
