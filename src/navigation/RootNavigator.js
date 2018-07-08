import { createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../containers/AuthLoading';
import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: DrawerNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
