import React from 'react';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { View, Text, Badge } from 'native-base';
import { type CalendarData, type Navigation } from '../../types';
import styles from './styles';
import { nowAsMoment } from '../../utils/dateHelper';

type Props = {
  navigation: Navigation,
  calendarData: CalendarData,
  month: string,
};

const isSunday = (day: moment) => day.day() === 0;
const isInRange = (day: moment, month: moment) => day.month() === month.month();
const isAfterToday = (day: moment) => day.isAfter(nowAsMoment());

const WeekDays = ({ calendarData, month, navigation }: Props) => {
  const monthAsMoment = moment.utc(month);
  return (
    <View style={styles.calendarContainer}>
      {Object.keys(calendarData || {}).map((day) => {
        const dayAsMoment = moment.utc(day);
        return (
          <TouchableOpacity
            key={day}
            onPress={
              isAfterToday(dayAsMoment)
                ? null
                : () => navigation.navigate('Day', { date: day })
            }
            style={[
              styles.dayCell,
              isSunday(dayAsMoment) && styles.sunday,
              !isInRange(dayAsMoment, monthAsMoment) && styles.outside,
            ]}
          >
            <View
              style={[
                styles.innerDayCell,
                calendarData[day].total ? styles.innerDayCellSuccess : null,
              ]}
            >
              <Text style={styles.dayLabel}>{moment(day).format('D')}</Text>
              {calendarData[day].total && (
                <Badge style={styles.eggCount}>
                  <Text style={styles.eggCountText}>
                    {calendarData[day].total}
                  </Text>
                </Badge>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default WeekDays;
