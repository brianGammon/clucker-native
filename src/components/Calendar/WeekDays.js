import React from 'react';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { View, Text, Icon } from 'native-base';
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
              <View>
                <Text style={styles.dayLabel}>{dayAsMoment.format('D')}</Text>
              </View>

              <View style={styles.dayCellInfo}>
                {calendarData[day].hasNote && (
                  <Icon style={styles.dayCellInfoIcon} name="attach" />
                )}
                {calendarData[day].hasNote && (
                  <Icon style={styles.dayCellInfoIcon} name="warning" />
                )}
              </View>

              <View>
                {calendarData[day].total && (
                  <View style={styles.eggCount}>
                    <Text style={styles.eggCountText}>
                      {calendarData[day].total}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default WeekDays;
