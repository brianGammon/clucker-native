import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Button } from 'react-native';
import Calendar from '../containers/Calendar';
import CalendarDay from '../containers/CalendarDay';

export default createStackNavigator({
  Month: {
    screen: Calendar,
    navigationOptions: ({ navigation }) => ({
      title: 'Month Calendar',
      headerLeft: <Button onPress={() => navigation.toggleDrawer()} title="Menu" />,
      headerRight: <Button onPress={() => navigation.navigate('EggModal')} title="Egg Modal" />,
    }),
  },
  Day: {
    screen: CalendarDay,
    navigationOptions: {
      title: 'Day Calendar',
    },
  },
});
