import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    padding: 20,
  },
  signUpContainer: {
    backgroundColor: 'rgba(255, 255, 255, .85)',
    width: '90%',
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
