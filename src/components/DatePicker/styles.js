import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: variables.inputBorderColor,
  },
  datePickerField: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    color: variables.inputColorPlaceholder,
  },
  clearDateIcon: {
    color: variables.textColor,
  },
  placeHolderTextStyle: {
    color: variables.inputColorPlaceholder,
  },
});
