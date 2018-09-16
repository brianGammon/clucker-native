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
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'grey',
  },
  h2: {
    fontWeight: 'bold',
  },
  text: {
    height: 20,
  },
  dateCell: {
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'grey',
  },
  dateCellSuccess: {
    backgroundColor: variables.successBackground,
  },
  lastCell: {
    borderRightWidth: 1,
    borderColor: 'grey',
  },
  dateCellLabel: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateCellIcon: {
    fontSize: 20,
  },
});
