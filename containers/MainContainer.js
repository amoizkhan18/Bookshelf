import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import SearchScreen from './SearchScreen';
import LibraryScreen from './LibraryScreen';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const MainContainer = () => (
  <Tab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Library" component={LibraryScreen} />
  </Tab.Navigator>
);

export default MainContainer;