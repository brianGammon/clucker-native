import { createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../containers/AuthLoading';
import AppDrawer from './AppDrawer';
import AuthStack from './AuthStack';

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppDrawer,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
