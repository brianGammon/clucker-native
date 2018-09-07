import { createStackNavigator } from 'react-navigation';
import CalendarScreen from '../components/Calendar';
import CalendarDayScreen from '../components/CalendarDay';

export default createStackNavigator(
  {
    Month: CalendarScreen,
    Day: CalendarDayScreen,
  },
  {
    headerMode: 'none',
  },
);
