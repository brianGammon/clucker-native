import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native';
import FlockScreen from '../../containers/Flock';
import ChickenScreen from '../../containers/Chicken';
import ChickenEditorScreen from '../../containers/ChickenEditor';

export default createStackNavigator({
  Flock: {
    screen: FlockScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Flock',
      headerLeft: (
        <Ionicons
          onPress={() => navigation.toggleDrawer()}
          name="ios-menu"
          size={25}
          style={{ paddingLeft: 10 }}
          color="grey"
        />
      ),
      headerRight: <Button onPress={() => navigation.navigate('EggModal')} title="Add Egg" />,
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
