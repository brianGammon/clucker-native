import { StyleSheet } from 'react-native';

const iconSize = 50;
const iconPadding = 10;
const fontSize = 16;

export default StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconLeft: {
    fontSize: iconSize,
    paddingLeft: iconPadding,
  },
  iconRight: {
    fontSize: iconSize,
    paddingRight: iconPadding,
  },
  label: {
    fontSize,
    fontWeight: 'bold',
  },
  text: {
    fontSize,
  },
});
