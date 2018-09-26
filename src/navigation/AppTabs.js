import * as React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'native-base';
import { createBottomTabNavigator } from 'react-navigation';
import StatsStack from './StatsStack';
import FlockStack from './FlockStack';
import CalendarStack from './CalendarStack';
import SettingsStack from './SettingsStack';
import withLinking from './withLinking';
import variables from '../styles/variables';

type TabBarIconProps = {
  isFocused: boolean,
  tintColor: string,
};

const getIcon = (iconName: string) => {
  const tabBarIconFunction = ({
    focused,
    tintColor,
  }: {
    focused: TabBarIconProps.focused,
    tintColor: TabBarIconProps.tintColor,
  }) => <Icon style={{ color: tintColor }} active={focused} name={iconName} />;
  return tabBarIconFunction;
};

export const Tabs = createBottomTabNavigator(
  {
    Stats: {
      screen: StatsStack,
      path: 'stats',
      navigationOptions: {
        tabBarLabel: 'All Time',
        tabBarIcon: getIcon('trending-up'),
      },
    },
    Calendar: {
      screen: CalendarStack,
      path: 'calendar',
      navigationOptions: {
        tabBarLabel: 'Month/Day',
        tabBarIcon: getIcon('calendar'),
      },
    },
    Flock: {
      screen: FlockStack,
      path: 'flock',
      navigationOptions: {
        tabBarIcon: getIcon('list-box'),
      },
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarIcon: getIcon('settings'),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: variables.cluckerGrey,
      inactiveTintColor: variables.cluckerGreyMedium,
    },
  },
);

export default withLinking(
  Tabs,
  Platform.OS === 'android' ? 'clucker://clucker/' : 'clucker://',
);
