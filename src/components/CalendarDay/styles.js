import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    flex: 1,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
  },
  notesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  eggNote: {
    fontStyle: 'italic',
    color: 'grey',
    marginLeft: 10,
    padding: 5,
  },
  moreButton: {
    alignSelf: 'center',
  },
  moreIcon: {
    fontSize: 30,
  },
});
