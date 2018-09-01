import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },
  formGroup: {
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  editorContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'grey',
  },
});
