import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import HeaderEgg from '../components/HeaderEgg';
import CalendarScreen from '../components/Calendar';
import CalendarDayScreen from '../components/CalendarDay';

export default createStackNavigator(
  {
    Month: {
      screen: CalendarScreen,
      navigationOptions: () => ({
        title: 'Month Calendar',
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
