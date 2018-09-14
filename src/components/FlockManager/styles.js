/* @flow */
import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

export default StyleSheet.create({
  noFlocksMessage: {
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: variables.cluckerOrangeLight,
    borderRadius: 20,
  },
  noFlocksMessageText: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
});
