import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Route from './Routes';
import {MyTabBar} from './MyTabBar';
import HomeContainer from '../../modules/Home/containers/HomeContainer';
import HistoryContainer from '../../modules/History/containers/HistoryContainer';
import RekapContainer from '../../modules/Rekap/containers/RekapContainer';
import ProfileContainer from '../../modules/Profile/containers/ProfileContainer';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName={Route.Home}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name={Route.Home} component={HomeContainer} />
      <Tab.Screen name={Route.History} component={HistoryContainer} />
      <Tab.Screen name={Route.Rekap} component={RekapContainer} />
      <Tab.Screen name={Route.Profile} component={ProfileContainer} />
    </Tab.Navigator>
  );
};

export default BottomTab;
