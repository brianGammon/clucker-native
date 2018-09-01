import * as React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StatsStack from './StatsStack';
import FlockStack from './FlockStack';
import CalendarStack from './CalendarStack';
import SettingsStack from './SettingsStack';
import withLinking from './withLinking';

type TabBarIconProps = {
  isFocused: boolean,
  tintColor: string,
};

export const Tabs = createBottomTabNavigator(
  {
    Stats: {
      screen: StatsStack,
      path: 'stats',
    },
    Flock: {
      screen: FlockStack,
      path: 'flock',
    },
    Calendar: {
      screen: CalendarStack,
      path: 'calendar',
    },
    Settings: SettingsStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({
        focused,
        tintColor,
      }: {
        focused: TabBarIconProps.focused,
        tintColor: TabBarIconProps.tintColor,
      }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Stats') {
          iconName = `ios-stats${focused ? '' : '-outline'}`;
        } else if (routeName === 'Flock') {
          iconName = `ios-list-box${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-settings${focused ? '' : '-outline'}`;
        } else if (routeName === 'Calendar') {
          iconName = `ios-calendar${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'grey',
      inactiveTintColor: 'grey',
    },
  },
);

export default withLinking(
  Tabs,
  Platform.OS === 'android' ? 'clucker://clucker/' : 'clucker://',
);
