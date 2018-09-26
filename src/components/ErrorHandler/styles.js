/* @flow */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 15,
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    width: 300,
    zIndex: 100,
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
