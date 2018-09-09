import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

const label = {
  fontSize: 17,
  fontWeight: 'bold',
};

export default StyleSheet.create({
  label: {
    ...label,
    color: variables.inputColorPlaceholder,
  },
});
