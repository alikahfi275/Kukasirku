import React from 'react';
import Routes, {navigation} from './Routes';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useModal} from 'react-native-modalfy';

// Bottom Tab
import BottomTab from './BottomTab';
import HomeContainer from '../../modules/Home/containers/HomeContainer';
import HistoryContainer from '../../modules/History/containers/HistoryContainer';
import RekapContainer from '../../modules/Rekap/containers/RekapContainer';
import ProfileContainer from '../../modules/Profile/containers/ProfileContainer';

// Re-Wrapped Screens
const Home = HomeContainer;
const History = HistoryContainer;
const Rekap = RekapContainer;
const Profile = ProfileContainer;

// Refs :
export const modalRef: any = React.createContext();

// Const :
const Stack = createStackNavigator();
// const INITIAL_ROUTE_NAME = Routes.SplashScreen;

const Stacks = (props: any) => {
  const {openModal, closeModal} = useModal();

  modalRef.current = {
    open: (modalName: any, params = {}) => openModal(modalName, params),
    close: (modalName: any) => closeModal(modalName),
  };

  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.BottomTab} component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
