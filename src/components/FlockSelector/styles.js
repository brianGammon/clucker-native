import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flockSelector: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  flockRow: {
    height: 45,
    padding: 10,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
});
