import { StyleSheet } from 'react-native';

const baseText = {
  padding: 20,
};
export default StyleSheet.create({
  success: {
    ...baseText,
    color: 'green',
  },
  message: {
    ...baseText,
    color: 'grey',
  },
});
