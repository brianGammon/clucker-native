import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderProfile from '../components/HeaderProfile';
import HeaderEgg from '../components/HeaderEgg';
import FlockScreen from '../components/Flock';
import ChickenScreen from '../components/Chicken';
import ChickenEditorScreen from '../containers/ChickenEditor';

export default createStackNavigator(
  {
    Flock: {
      screen: FlockScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Flock',
        headerLeft: <HeaderProfile navigation={navigation} />,
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
        title: 'Chicken Editor',
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
