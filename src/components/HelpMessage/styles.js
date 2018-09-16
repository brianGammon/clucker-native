import { StyleSheet } from 'react-native';
import variables from '../../styles/variables';

export default StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    backgroundColor: variables.cluckerOrangeLight,
    borderRadius: 20,
    alignItems: 'center',
  },
  messageContainer: {
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});
