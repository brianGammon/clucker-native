import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
