import { createStackNavigator } from 'react-navigation';
import SettingsScreen from '../components/Settings';

export default createStackNavigator({
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
    },
  },
});
