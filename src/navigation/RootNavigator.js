import { createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../containers/AuthLoading';
import DrawerNavigator from './AppDrawer';
import AuthNavigator from './AuthStack';

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
