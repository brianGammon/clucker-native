import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderEgg from '../components/HeaderEgg';
import FlockScreen from '../components/Flock';
import ChickenScreen from '../components/Chicken';

export default createStackNavigator(
  {
    Flock: {
      screen: FlockScreen,
      navigationOptions: () => ({
        title: 'Flock',
      }),
    },
    Chicken: {
      screen: ChickenScreen,
      path: 'chicken/:chickenId',
      navigationOptions: {
        title: 'Chicken Profile',
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerRight: <HeaderEgg navigation={navigation} />,
    }),
  },
);
