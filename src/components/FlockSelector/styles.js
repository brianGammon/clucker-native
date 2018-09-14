/* @flow */
import { StyleSheet } from 'react-native';
import common from '../../styles/common';

export default StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  helpTextContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  helpText: common.helpText,
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  listItemLeft: {
    alignItems: 'center',
  },
  listItemLeftText: {
    marginLeft: 10,
  },
});
