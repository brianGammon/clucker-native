import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

export default StyleSheet.create({
  submit: {
    marginTop: 20,
  },
  error: {
    color: variables.inputErrorBorderColor,
  },
});
