/* @flow */
import { StyleSheet } from 'react-native';
import common from '../../styles/common';

export default StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  helpTextContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  helpText: common.helpText,
  listItem: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  listItemLeft: {
    alignItems: 'center',
  },
  listItemLeftText: {
    marginLeft: 10,
  },
});
