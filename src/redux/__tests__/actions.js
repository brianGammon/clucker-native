import firebase from 'react-native-firebase';
import * as actions from '../actions';
import * as constants from '../constants';

describe('Redux actions:', () => {
  test(`${constants.actionTypes.LISTEN_REQUESTED}`, () => {
    const ref = firebase.database().ref('someRef');
    expect(
      actions.firebaseListenRequested(ref, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.LISTEN_REJECTED}`, () => {
    const error = new Error('Error!');
    expect(
      actions.firebaseListenRejected(error, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.LISTEN_FULFILLED}`, () => {
    const key = 'someKey';
    const data = { item1: 1, item2: 2 };
    expect(
      actions.firebaseListenFulfilled({ key, data }, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.CHILD_ADDED}`, () => {
    const id = '1';
    const value = 'a';

    expect(
      actions.firebaseListenChildAdded(id, value, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.CHILD_CHANGED}`, () => {
    const id = '1';
    const value = 'a';

    expect(
      actions.firebaseListenChildChanged(id, value, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.CHILD_REMOVED}`, () => {
    const id = '1';
    expect(
      actions.firebaseListenChildRemoved(id, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.CREATE_REQUESTED}`, () => {
    const payload = {
      flockId: 'flock1',
      data: {
        name: 'Test Chicken',
      },
    };
    expect(
      actions.firebaseCreateRequested(payload, 'chickens'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.CREATE_FULFILLED}`, () => {
    expect(actions.firebaseCreateFulfilled('chickens')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.CREATE_REJECTED}`, () => {
    const error = new Error('Error!');

    expect(actions.firebaseCreateRejected(error, 'chickens')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.UPDATE_REQUESTED}`, () => {
    const uid = '1';

    expect(
      actions.firebaseUpdateRequested(uid, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.UPDATE_FULFILLED}`, () => {
    expect(actions.firebaseUpdateFulfilled('userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.UPDATE_REJECTED}`, () => {
    const error = new Error('Error!');

    expect(
      actions.firebaseUpdateRejected(error, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.REMOVE_REQUESTED}`, () => {
    const uid = '1';

    expect(
      actions.firebaseRemoveRequested(uid, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.REMOVE_FULFILLED}`, () => {
    expect(actions.firebaseRemoveFulfilled('userContacts')).toMatchSnapshot();
  });

  test(`${constants.actionTypes.REMOVE_REJECTED}`, () => {
    const error = new Error('Error!');

    expect(
      actions.firebaseRemoveRejected(error, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.LISTEN_REMOVED}`, () => {
    expect(
      actions.firebaseListenRemoved(true, 'userContacts'),
    ).toMatchSnapshot();
  });

  test(`${constants.actionTypes.REMOVE_LISTENER_REQUESTED}`, () => {
    expect(
      actions.firebaseRemoveListenerRequested(true, 'userContacts'),
    ).toMatchSnapshot();
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
      actions.updateUserSettingsRequested('userId1', 'some name', 'flockId1', {
        flockId1: true,
      }),
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
    expect(
      actions.getFlockFulfilled({ name: 'Test Flock', ownedBy: 'user1' }),
    ).toMatchSnapshot();
  });

  test('setInitialUrl', () => {
    expect(actions.setInitialUrl('test://test')).toMatchSnapshot();
  });

  test('removeInitialUrl', () => {
    expect(actions.removeInitialUrl()).toMatchSnapshot();
  });

  test('authStatusChanged to authenticated', () => {
    const user = { uid: 'test', email: 'test@example.com' };
    expect(actions.authStatusChanged(user)).toMatchSnapshot();
  });

  test('authStatusChanged to not authenticated', () => {
    expect(actions.authStatusChanged(null)).toMatchSnapshot();
  });

  test('signInRequested', () => {
    expect(
      actions.signInRequested('test@example.com', 'password123'),
    ).toMatchSnapshot();
  });

  test('signInRejected', () => {
    expect(
      actions.signInRejected(new Error('sign in rejected test')),
    ).toMatchSnapshot();
  });
});
