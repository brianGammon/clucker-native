import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderProfile from '../components/HeaderProfile';
import HeaderEgg from '../components/HeaderEgg';
import CalendarScreen from '../containers/Calendar';
import CalendarDayScreen from '../containers/CalendarDay';

export default createStackNavigator(
  {
    Month: {
      screen: CalendarScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Month Calendar',
        headerLeft: <HeaderProfile navigation={navigation} />,
      }),
    },
    Day: {
      screen: CalendarDayScreen,
      navigationOptions: {
        title: 'Day View',
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerRight: <HeaderEgg navigation={navigation} />,
    }),
  },
);
