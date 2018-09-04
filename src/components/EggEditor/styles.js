import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

export default StyleSheet.create({
  submit: {
    marginTop: 20,
  },
  errorContainer: {
    height: 20,
  },
  error: {
    color: variables.inputErrorBorderColor,
    paddingTop: 2,
    paddingLeft: 4,
    fontSize: 14,
  },
  pickerContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  pickerText: {
    color: variables.textColor,
  },
  label: {
    fontWeight: 'bold',
  },
  checkboxContainer: {
    marginLeft: -10,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxLabel: {
    marginLeft: 20,
  },
});
