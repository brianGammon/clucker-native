import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

const iconSize = 50;
const iconPadding = 10;

export default StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconLeft: {
    fontSize: iconSize,
    paddingLeft: iconPadding,
  },
  iconRight: {
    fontSize: iconSize,
    paddingRight: iconPadding,
  },
  moreIcon: {
    fontSize: 30,
  },
  trophyIcon: {
    fontSize: 24,
  },
  awardText: {
    marginLeft: 8,
  },
  chickenInfo: {
    marginLeft: 10,
  },
  chickenInfoText: {
    height: 20,
    fontSize: 16,
    color: variables.cluckerGrey,
  },
  fieldGroup: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  image: {
    width: 180,
    height: 180,
  },
  label: {
    fontWeight: 'bold',
  },
  h2: {
    fontWeight: 'bold',
  },
  text: {
    height: 20,
  },
  dateCell: {
    alignItems: 'center',
    padding: 5,
    width: '14.2857%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: variables.cluckerGreyLight,
  },
  dateCellSuccess: {
    backgroundColor: variables.successBackground,
  },
  lastCell: {
    borderRightWidth: 1,
    borderColor: variables.cluckerGreyLight,
  },
  dateCellLabel: {
    color: variables.cluckerGrey,
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateCellIcon: {
    fontSize: 20,
  },
  pastWeek: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  pastWeekContainer: {
    width: '100%',
    flexDirection: 'row',
  },
});
