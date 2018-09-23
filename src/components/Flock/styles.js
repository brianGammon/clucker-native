import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

export default StyleSheet.create({
  noChickens: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerBlock: {
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerCellLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: variables.inputColorPlaceholder,
  },
  last: {
    borderLeftWidth: 1,
    borderLeftColor: variables.inputColorPlaceholder,
  },
  bodyCell: {
    flex: 1,
  },
  addText: {
    paddingLeft: 8,
    color: variables.inputColorPlaceholder,
  },
});
