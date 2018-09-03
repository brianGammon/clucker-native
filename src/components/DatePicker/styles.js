import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: variables.inputBorderColor,
  },
  datePickerField: {
    flex: 1,
  },
  placeHolderTextStyle: {
    color: variables.inputColorPlaceholder,
    fontSize: variables.inputFontSize,
  },
});
