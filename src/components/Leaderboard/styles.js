import { StyleSheet } from 'react-native';

const row = {
  padding: 4,
  flexDirection: 'row',
  alignItems: 'center',
};

const label = {
  width: 40,
  fontWeight: 'bold',
  color: 'grey',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  statsLabel: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  row,
  headerRow: {
    ...row,
    backgroundColor: '#eee',
  },
  label,
  wideLabel: {
    ...label,
    flex: 1,
  },
  value: {
    width: 40,
    textAlign: 'center',
  },
  wideValue: {
    flex: 1,
  },
});
