import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

export default StyleSheet.create({
  label: {
    fontWeight: 'bold',
    color: variables.inputColorPlaceholder,
  },
  revealPassword: {
    marginLeft: 5,
    marginRight: 5,
    color: 'grey',
    fontSize: 32,
  },
  errorContainer: {
    height: 20,
  },
  error: {
    color: 'red',
    paddingTop: 2,
    paddingLeft: 4,
    fontSize: 14,
  },
});
