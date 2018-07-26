import firebase from 'react-native-firebase';
import * as actions from '../actions';
import * as constants from '../constants';

describe('Redux actions:', () => {
  test(`${constants.actionTypes.LISTEN_REQUESTED}`, () => {
    const ref = firebase.database().ref('someRef');
    expect(actions.firebaseListenRequested(ref, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.LISTEN_REJECTED}`, () => {
    const error = new Error('Error!');
    expect(actions.firebaseListenRejected(error, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.LISTEN_FULFILLED}`, () => {
    const items = { item1: 1, item2: 2 };
    expect(actions.firebaseListenFulfilled(items, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.LISTEN_CHILD_ADDED}`, () => {
    const id = '1';
    const value = 'a';

    expect(actions.firebaseListenChildAdded(id, value, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.LISTEN_CHILD_CHANGED}`, () => {
    const id = '1';
    const value = 'a';

    expect(actions.firebaseListenChildChanged(id, value, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.LISTEN_CHILD_REMOVED}`, () => {
    const id = '1';
    expect(actions.firebaseListenChildRemoved(id, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.UPDATE_REQUESTED}`, () => {
    const uid = '1';

    expect(actions.firebaseUpdateRequested(uid, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.UPDATE_FULFILLED}`, () => {
    expect(actions.firebaseUpdateFulfilled('userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.UPDATE_REJECTED}`, () => {
    const error = new Error('Error!');

    expect(actions.firebaseUpdateRejected(error, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.REMOVE_REQUESTED}`, () => {
    const uid = '1';

    expect(actions.firebaseRemoveRequested(uid, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.REMOVE_FULFILLED}`, () => {
    expect(actions.firebaseRemoveFulfilled('userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.REMOVE_REJECTED}`, () => {
    const error = new Error('Error!');

    expect(actions.firebaseRemoveRejected(error, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.LISTEN_REMOVED}`, () => {
    expect(actions.firebaseListenRemoved(true, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.REMOVE_LISTENER_REQUESTED}`, () => {
    expect(actions.firebaseRemoveListenerRequested(true, 'userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.REMOVE_ALL_LISTENERS_REQUESTED}`, () => {
    expect(actions.firebaseRemoveAllListenersRequested()).toMatchSnapshot();
  });

  test('listenToChickens', () => {
    expect(actions.listenToChickens('flockId1')).toMatchSnapshot();
  });

  test('listenToEggs', () => {
    expect(actions.listenToEggs('flockId1')).toMatchSnapshot();
  });

  test('listenToUserSettings', () => {
    expect(actions.listenToUserSettings('userId1')).toMatchSnapshot();
  });

  test('removeUserSettingsListenerRequested', () => {
    expect(actions.removeUserSettingsListenerRequested()).toMatchSnapshot();
  });

  test('updateUserSettingsRequested', () => {
    expect(
      actions.updateUserSettingsRequested('userId1', 'some name', 'flockId1', { flockId1: true }),
    ).toMatchSnapshot();
  });

  test('removeUserSettingsRequested', () => {
    expect(actions.removeUserSettingsRequested('userId1')).toMatchSnapshot();
  });

  test('getFlock', () => {
    expect(actions.getFlock('flockId1')).toMatchSnapshot();
  });

  test('getFlockRejected', () => {
    expect(actions.getFlockRejected(new Error('Error1'))).toMatchSnapshot();
  });

  test('getFlockFulfilled', () => {
    expect(actions.getFlockFulfilled({ name: 'Test Flock', ownedBy: 'user1' })).toMatchSnapshot();
  });

  test('setInitialUrl', () => {
    expect(actions.setInitialUrl('test://test')).toMatchSnapshot();
  });

  test('removeInitialUrl', () => {
    expect(actions.removeInitialUrl()).toMatchSnapshot();
  });
});
