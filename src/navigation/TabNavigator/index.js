import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FlockNavigator from '../FlockNavigator';
import CalendarNavigator from '../CalendarNavigator';
import SettingsNavigator from '../SettingsNavigator';

export default createBottomTabNavigator(
  {
    Flock: FlockNavigator,
    Calendar: CalendarNavigator,
    Settings: SettingsNavigator,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Flock') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-settings${focused ? '' : '-outline'}`;
        } else if (routeName === 'Calendar') {
          iconName = `ios-calendar${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);
