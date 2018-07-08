import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import AppNavigator from './AppNavigator';
import Drawer from '../containers/Drawer';

export default createDrawerNavigator(
  {
    App: AppNavigator,
  },
  {
    contentComponent: ({ navigation }) => <Drawer navigation={navigation} />,
  },
);
