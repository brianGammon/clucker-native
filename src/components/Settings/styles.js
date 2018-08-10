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
  sectionLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  sectionLine: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: 'lightgrey',
  },
  formGroup: {
    marginTop: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
