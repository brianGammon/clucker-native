import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import ModalStack from './ModalStack';
import Drawer from '../containers/Drawer';

export default createDrawerNavigator(
  {
    App: ModalStack,
  },
  {
    contentComponent: ({ navigation }) => <Drawer navigation={navigation} />,
  },
);
