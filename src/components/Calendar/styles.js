import { StyleSheet } from 'react-native';

const label = {
  color: 'grey',
  fontWeight: 'bold',
  fontSize: 17,
};

const cell = {
  width: '14.28571%',
  alignItems: 'center',
};

const rowContainer = {
  flexDirection: 'row',
};

export default StyleSheet.create({
  section: {
    marginTop: 10,
  },
  labelContainer: {
    ...rowContainer,
  },
  labelCell: {
    ...cell,
    borderBottomWidth: 1,
  },
  outside: {
    backgroundColor: '#ddd',
  },
  label,
  calendarContainer: {
    ...rowContainer,
    flexWrap: 'wrap',
  },
  dayCell: {
    ...cell,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    minHeight: 60,
  },
  innerDayCell: {
    padding: 2,
    flex: 1,
    width: '100%',
  },
  sunday: {
    borderLeftWidth: 1,
  },
  dayLabel: {
    ...label,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
  },
  eggCount: {
    alignSelf: 'center',
  },
  statsLabel: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});
