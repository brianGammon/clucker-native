import { createSwitchNavigator } from 'react-navigation';
import PreloadScreen from '../components/Preload';
import ModalStack from './ModalStack';
import AuthStack from './AuthStack';

export default createSwitchNavigator(
  {
    Preload: PreloadScreen,
    SignedIn: ModalStack,
    SignedOut: AuthStack,
  },
  {
    initialRouteName: 'Preload',
  },
);
