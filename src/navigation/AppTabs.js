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
          iconName = 'stats';
        } else if (routeName === 'Flock') {
          iconName = 'list-box';
        } else if (routeName === 'Settings') {
          iconName = 'settings';
        } else if (routeName === 'Calendar') {
          iconName = 'calendar';
        }
        return (
          <Icon style={{ color: tintColor }} active={focused} name={iconName} />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: variables.cluckerGrey,
      inactiveTintColor: variables.cluckerGrey,
    },
  },
);

export default withLinking(
  Tabs,
  Platform.OS === 'android' ? 'clucker://clucker/' : 'clucker://',
);
