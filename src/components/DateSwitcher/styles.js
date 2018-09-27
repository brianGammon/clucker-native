import { StyleSheet } from 'react-native';

const rowContainer = {
  flexDirection: 'row',
};

export default StyleSheet.create({
  rowContainer,
  dateSwitcher: {
    ...rowContainer,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  monthTitle: {
    fontWeight: 'bold',
  },
  statsLabel: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  eggStats: {
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
});
