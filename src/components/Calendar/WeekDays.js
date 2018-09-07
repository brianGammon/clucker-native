import React from 'react';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { View, Text, Badge } from 'native-base';
import { type CalendarData, type Navigation } from '../../types';
import styles from './styles';

type Props = {
  navigation: Navigation,
  calendarData: CalendarData,
  month: string,
};

const isSunday = day => moment(day).day() === 0;
const isInRange = (day, month) => moment(day).month() === moment(month).month();

const WeekDays = ({ calendarData, month, navigation }: Props) => (
  <View style={styles.calendarContainer}>
    {Object.keys(calendarData || {}).map(day => (
      <TouchableOpacity
        key={day}
        onPress={() => navigation.navigate('Day', { date: day })}
        style={[
          styles.dayCell,
          isSunday(day) && styles.sunday,
          !isInRange(day, month) && styles.outside,
        ]}
      >
        <View style={styles.innerDayCell}>
          <Text style={styles.dayLabel}>{moment(day).format('D')}</Text>
          {calendarData[day].total && (
            <Badge success style={styles.eggCount}>
              <Text>{calendarData[day].total}</Text>
            </Badge>
          )}
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

export default WeekDays;
