import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderEgg from '../components/HeaderEgg';
import FlockStats from '../components/FlockStats';

export default createStackNavigator(
  {
    FlockStats: {
      screen: FlockStats,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerRight: <HeaderEgg navigation={navigation} />,
    }),
  },
);
