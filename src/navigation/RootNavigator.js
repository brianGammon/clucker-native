import { createSwitchNavigator } from 'react-navigation';
import PreloadScreen from '../components/Preload';
import AppDrawer from './AppDrawer';
import AuthStack from './AuthStack';

export default createSwitchNavigator(
  {
    Preload: PreloadScreen,
    SignedIn: AppDrawer,
    SignedOut: AuthStack,
  },
  {
    initialRouteName: 'Preload',
  },
);
