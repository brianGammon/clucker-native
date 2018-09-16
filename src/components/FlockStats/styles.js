import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

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
    color: variables.cluckerGrey,
  },
  subText: {
    fontSize: 14,
  },
  noEggsMessage: {
    flex: 1,
    alignItems: 'center',
  },
});
