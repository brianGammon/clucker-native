import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderEgg from '../components/HeaderEgg';
import FlockScreen from '../components/Flock';
import ChickenScreen from '../components/Chicken';
import ChickenEditorScreen from '../components/ChickenEditor';

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
    ChickenEditor: {
      screen: ChickenEditorScreen,
      navigationOptions: {
        headerRight: null,
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerRight: <HeaderEgg navigation={navigation} />,
    }),
  },
);
