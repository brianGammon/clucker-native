import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

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
    borderColor: variables.cluckerGreyLight,
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
    borderColor: variables.cluckerGreyLight,
    minHeight: 60,
  },
  innerDayCell: {
    padding: 2,
    flex: 1,
    width: '100%',
  },
  innerDayCellSuccess: {
    backgroundColor: variables.successBackground,
  },
  sunday: {
    borderLeftWidth: 1,
    borderColor: variables.cluckerGreyLight,
  },
  dayLabel: {
    ...label,
    fontWeight: 'normal',
    alignSelf: 'flex-start',
  },
  eggCountCircle: {
    alignSelf: 'center',
  },
  eggCount: {
    alignSelf: 'center',
    backgroundColor: variables.successBackground,
    borderWidth: 1,
  },
  eggCountText: {
    fontWeight: 'bold',
    color: 'black',
  },
  statsLabel: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});
