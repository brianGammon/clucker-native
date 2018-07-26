import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import ModalStack from './ModalStack';
import Drawer from '../components/Drawer';

type Props = {
  navigation: any,
};

export default createDrawerNavigator(
  {
    App: ModalStack,
  },
  {
    contentComponent: ({ navigation }: { navigation: Props.navigation }) => (
      <Drawer navigation={navigation} />
    ),
  },
);
