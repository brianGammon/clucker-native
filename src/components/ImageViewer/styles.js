/* @flow */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeIcon: {
    fontSize: 60,
  },
});
