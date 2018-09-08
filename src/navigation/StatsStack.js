import { createStackNavigator } from 'react-navigation';
import FlockStats from '../components/FlockStats';

export default createStackNavigator(
  {
    FlockStats,
  },
  {
    headerMode: 'none',
  },
);
