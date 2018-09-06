import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

export default StyleSheet.create({
  line: {
    width: '90%',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: variables.inputColorPlaceholder,
    alignSelf: 'center',
  },
});
