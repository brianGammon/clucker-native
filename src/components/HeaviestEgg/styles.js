import { StyleSheet } from 'react-native';

const row = {
  padding: 4,
  flexDirection: 'row',
};

const label = {
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
  medLabel: {
    ...label,
    textAlign: 'center',
    width: 100,
  },
  wideLabel: {
    ...label,
    flex: 1,
  },
  value: {
    width: 100,
    textAlign: 'center',
  },
  wideValue: {
    flex: 1,
  },
});
