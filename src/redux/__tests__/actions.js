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

  xtest('listenToMessages', () => {
    const ref = firebase.database().ref('messages');
    const expectedAction = {
      type: constants.actionTypes.LISTEN_REQUESTED,
      payload: ref,
      meta: { type: constants.metaTypes.messages },
    };
    expect(actions.listenToMessages()).toEqual(expectedAction);
  });

  xtest('listenToUserContacts', () => {
    const uid = '123';
    const ref = firebase.database().ref(`users/${uid}/contacts`);
    const expectedAction = {
      type: constants.actionTypes.LISTEN_REQUESTED,
      payload: ref,
      meta: { type: 'userContacts' },
    };
    expect(actions.listenToUserContacts(uid)).toEqual(expectedAction);
  });

  xtest('removeMessagesListenerRequested', () => {
    const expectedAction = {
      type: constants.actionTypes.REMOVE_LISTENER_REQUESTED,
      payload: { clearItems: false },
      meta: { type: constants.metaTypes.messages },
    };
    expect(actions.removeMessagesListenerRequested()).toEqual(expectedAction);
  });

  xtest('removeUserContactsListenerRequested', () => {
    const expectedAction = {
      type: constants.actionTypes.REMOVE_LISTENER_REQUESTED,
      payload: { clearItems: false },
      meta: { type: 'userContacts' },
    };
    expect(actions.removeUserContactsListenerRequested()).toEqual(expectedAction);
  });

  xtest('updateUserContactsRequested', () => {
    const uid = '1';
    const contactId = '123';
    const name = 'John Doe';
    const phone = '123456789';
    const expectedAction = {
      type: constants.actionTypes.UPDATE_REQUESTED,
      payload: {
        uid,
        contactId,
        name,
        phone,
      },
      meta: { type: 'userContacts' },
    };
    expect(actions.updateUserContactsRequested(uid, contactId, name, phone)).toEqual(
      expectedAction,
    );
  });

  xtest('removeUserContactsRequested', () => {
    const uid = '1';
    const contactId = '123';
    const expectedAction = {
      type: constants.actionTypes.REMOVE_REQUESTED,
      payload: { uid, contactId },
      meta: { type: 'userContacts' },
    };
    expect(actions.removeUserContactsRequested(uid, contactId)).toEqual(expectedAction);
  });
});
