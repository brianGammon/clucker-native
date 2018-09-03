import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 80,
    height: 80,
  },
  headerCopy: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headerSubTitle: {
    color: 'grey',
  },
  extraLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
  },
  error: {
    color: 'red',
    padding: 20,
  },
  body: {
    backgroundColor: 'rgba(255, 255, 255, .85)',
    width: '90%',
    maxWidth: 450,
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    margin: 5,
  },
  bodyText: {
    color: 'grey',
  },
});
