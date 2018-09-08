import { StyleSheet } from 'react-native';
import variables from 'native-base/dist/src/theme/variables/platform';

const label = {
  fontSize: 17,
  fontWeight: 'bold',
};

export default StyleSheet.create({
  eggStatsLabel: {
    ...label,
    alignSelf: 'center',
    marginBottom: 8,
  },
  eggStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eggStatsCell: {
    alignItems: 'center',
  },
  eggStatsValue: {
    fontWeight: 'bold',
  },
  label: {
    ...label,
    color: variables.inputColorPlaceholder,
  },
  subText: {
    fontSize: 14,
  },
});
