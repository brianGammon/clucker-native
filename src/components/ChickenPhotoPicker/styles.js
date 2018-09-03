import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

export default StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
  },
  photoControls: {
    flex: 1,
  },
  label: {
    fontSize: 17,
    paddingBottom: 10,
    color: variables.inputColorPlaceholder,
  },
});
