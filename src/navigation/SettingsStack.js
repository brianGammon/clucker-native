/* @flow */
import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../components/Settings';

export default createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    headerMode: 'none',
  },
);
