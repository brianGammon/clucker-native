/* @flow */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 15,
    alignSelf: 'center',
    width: 300,
    backgroundColor: '#d9534f',
    borderRadius: 10,
  },
  helpTextContainer: {
    marginVertical: 20,
  },
  helpTextItem: {
    marginBottom: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  buttonText: {
    paddingLeft: 0,
  },
  accordianHeader: {
    backgroundColor: '#d9534f',
  },
  accordianContent: {
    backgroundColor: '#ea7f7c',
  },
});
