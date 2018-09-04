import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

export default StyleSheet.create({
  container: {
    marginTop: 30,
  },
  photoControls: {
    flex: 1,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: variables.inputColorPlaceholder,
  },
});
