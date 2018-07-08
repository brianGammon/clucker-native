import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';
import FlockScreen from '../containers/Flock';
import ChickenScreen from '../containers/Chicken';
import ChickenEditorScreen from '../containers/ChickenEditor';

const headerL = navigation => (
  <Ionicons
    onPress={() => navigation.toggleDrawer()}
    name="ios-menu"
    size={25}
    style={{ paddingLeft: 10 }}
    color="grey"
  />
);

export default createStackNavigator({
  Flock: {
    screen: FlockScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Flock',
      headerLeft: headerL(navigation),
      headerRight: (
        <Text
          onPress={() => navigation.navigate('EggModal')}
          style={{ color: 'grey', fontSize: 15, paddingRight: 10 }}
        >
          +
          <Ionicons name="ios-egg" size={25} color="grey" />
        </Text>
      ),
    }),
  },
  Chicken: {
    screen: ChickenScreen,
    navigationOptions: {
      title: 'Chicken Profile',
    },
  },
  ChickenEditor: {
    screen: ChickenEditorScreen,
    navigationOptions: {
      title: 'Chicken Editor',
    },
  },
});
