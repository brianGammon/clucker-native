import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const borderColor = variables.cluckerGreyMedium;

const label = {
  color: variables.cluckerGrey,
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
    borderColor,
  },
  outside: {
    backgroundColor: variables.cluckerGreyLight,
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
    borderColor,
    minHeight: 70,
  },
  innerDayCell: {
    padding: 2,
    flex: 1,
    width: '100%',
  },
  innerDayCellSuccess: {
    backgroundColor: variables.successBackground,
  },
  dayCellInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minHeight: 20,
  },
  dayCellInfoIcon: {
    fontSize: 18,
    paddingHorizontal: 2,
  },
  sunday: {
    borderLeftWidth: 1,
    borderColor,
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
