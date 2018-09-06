import { createStackNavigator } from 'react-navigation';
import FlockScreen from '../components/Flock';
import ChickenScreen from '../components/Chicken';

export default createStackNavigator(
  {
    Flock: FlockScreen,
    Chicken: {
      screen: ChickenScreen,
      path: 'chicken/:chickenId',
    },
  },
  {
    headerMode: 'none',
  },
);
