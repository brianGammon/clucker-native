import * as React from 'react';
import { Platform } from 'react-native';
import { Icon, Text } from 'native-base';
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
    Calendar: {
      screen: CalendarStack,
      path: 'calendar',
    },
    Flock: {
      screen: FlockStack,
      path: 'flock',
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
          iconName = 'trending-up';
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
      tabBarLabel: ({
        tintColor,
      }: {
        tintColor: TabBarIconProps.tintColor,
      }) => {
        const { routeName } = navigation.state;
        let label;
        if (routeName === 'Stats') {
          label = 'All Time';
        } else if (routeName === 'Calendar') {
          label = 'Month/Day';
        } else {
          label = routeName;
        }
        return <Text style={{ color: tintColor, fontSize: 12, alignSelf: 'center' }}>{label}</Text>;
      },
    }),
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
