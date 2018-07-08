import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../containers/Settings';
import FlockSettingsScreen from '../containers/FlockSettings';

export default createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
    },
  },
  FlockSettings: {
    screen: FlockSettingsScreen,
    navigationOptions: {
      title: 'Flock Settings',
    },
  },
});
