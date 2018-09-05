import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

export default StyleSheet.create({
  noChickens: {
    flexDirection: 'row',
    margin: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noChickensText: {
    color: variables.inputColorPlaceholder,
  },
  header: {
    flexDirection: 'row',
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerCellLabel: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  headerCellText: {
    color: variables.inputColorPlaceholder,
  },
  last: {
    borderLeftWidth: 1,
    borderLeftColor: variables.inputColorPlaceholder,
  },
  bodyCell: {
    flex: 1,
  },
  trophyCell: {
    alignItems: 'center',
  },
  trophyCellText: {
    fontSize: 12,
    color: 'black',
    // color: variables.inputColorPlaceholder,
  },
  trophyIcon: {
    fontSize: 18,
    color: 'black',
    // color: variables.inputColorPlaceholder,
  },
});
