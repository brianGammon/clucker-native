import firebase from 'react-native-firebase';
import * as actions from '../actions';
import * as constants from '../constants';

describe('firebase actions', () => {
  test(constants.actionTypes.LISTEN_REQUESTED, () => {
    const ref = firebase.database().ref('someRef');
    const expectedAction = {
      type: constants.actionTypes.LISTEN_REQUESTED,
      payload: { ref },
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.firebaseListenRequested(ref, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.LISTEN_REJECTED, () => {
    const error = new Error('Error!');
    const expectedAction = {
      type: constants.actionTypes.LISTEN_REJECTED,
      payload: { error },
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.firebaseListenRejected(error, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.LISTEN_FULFILLED, () => {
    const items = { item1: 1, item2: 2 };
    const expectedAction = {
      type: constants.actionTypes.LISTEN_FULFILLED,
      payload: { items },
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.firebaseListenFulfilled(items, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.LISTEN_CHILD_ADDED, () => {
    const id = '1';
    const value = 'a';
    const expectedAction = {
      type: constants.actionTypes.LISTEN_CHILD_ADDED,
      payload: { id, value },
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.firebaseListenChildAdded(id, value, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.LISTEN_CHILD_CHANGED, () => {
    const id = '1';
    const value = 'a';
    const expectedAction = {
      type: constants.actionTypes.LISTEN_CHILD_CHANGED,
      payload: { id, value },
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.firebaseListenChildChanged(id, value, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.LISTEN_CHILD_REMOVED, () => {
    const id = '1';
    const expectedAction = {
      type: constants.actionTypes.LISTEN_CHILD_REMOVED,
      payload: { id },
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.firebaseListenChildRemoved(id, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.UPDATE_REQUESTED, () => {
    const uid = '1';
    const expectedAction = {
      type: constants.actionTypes.UPDATE_REQUESTED,
      payload: uid,
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.firebaseUpdateRequested(uid, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.UPDATE_FULFILLED, () => {
    const expectedAction = {
      type: constants.actionTypes.UPDATE_FULFILLED,
      payload: {},
      meta: { type: constants.metaTypes.userContacts },
    };

    expect(actions.firebaseUpdateFulfilled(constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.UPDATE_REJECTED, () => {
    const error = new Error('Error!');
    const expectedAction = {
      type: constants.actionTypes.UPDATE_REJECTED,
      payload: { error },
      meta: { type: constants.metaTypes.userContacts },
    };

    expect(actions.firebaseUpdateRejected(error, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.REMOVE_REQUESTED, () => {
    const uid = '1';
    const expectedAction = {
      type: constants.actionTypes.REMOVE_REQUESTED,
      payload: uid,
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.firebaseRemoveRequested(uid, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.REMOVE_FULFILLED, () => {
    const expectedAction = {
      type: constants.actionTypes.REMOVE_FULFILLED,
      payload: {},
      meta: { type: constants.metaTypes.userContacts },
    };

    expect(actions.firebaseRemoveFulfilled(constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.REMOVE_REJECTED, () => {
    const error = new Error('Error!');
    const expectedAction = {
      type: constants.actionTypes.REMOVE_REJECTED,
      payload: { error },
      meta: { type: constants.metaTypes.userContacts },
    };

    expect(actions.firebaseRemoveRejected(error, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.LISTEN_REMOVED, () => {
    const expectedAction = {
      type: constants.actionTypes.LISTEN_REMOVED,
      payload: { clearItems: true },
      meta: { type: constants.metaTypes.userContacts },
    };

    expect(actions.firebaseListenRemoved(true, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.REMOVE_LISTENER_REQUESTED, () => {
    const expectedAction = {
      type: constants.actionTypes.REMOVE_LISTENER_REQUESTED,
      payload: { clearItems: true },
      meta: { type: constants.metaTypes.userContacts },
    };

    expect(actions.firebaseRemoveListenerRequested(true, constants.metaTypes.userContacts)).toEqual(
      expectedAction,
    );
  });

  test(constants.actionTypes.REMOVE_ALL_LISTENERS_REQUESTED, () => {
    const expectedAction = {
      type: constants.actionTypes.REMOVE_ALL_LISTENERS_REQUESTED,
      payload: { clearItems: true },
    };

    expect(actions.firebaseRemoveAllListenersRequested()).toEqual(expectedAction);
  });

  test('listenToMessages', () => {
    const ref = firebase.database().ref('messages');
    const expectedAction = {
      type: constants.actionTypes.LISTEN_REQUESTED,
      payload: ref,
      meta: { type: constants.metaTypes.messages },
    };
    expect(actions.listenToMessages()).toEqual(expectedAction);
  });

  test('listenToUserContacts', () => {
    const uid = '123';
    const ref = firebase.database().ref(`users/${uid}/contacts`);
    const expectedAction = {
      type: constants.actionTypes.LISTEN_REQUESTED,
      payload: ref,
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.listenToUserContacts(uid)).toEqual(expectedAction);
  });

  test('removeMessagesListenerRequested', () => {
    const expectedAction = {
      type: constants.actionTypes.REMOVE_LISTENER_REQUESTED,
      payload: { clearItems: false },
      meta: { type: constants.metaTypes.messages },
    };
    expect(actions.removeMessagesListenerRequested()).toEqual(expectedAction);
  });

  test('removeUserContactsListenerRequested', () => {
    const expectedAction = {
      type: constants.actionTypes.REMOVE_LISTENER_REQUESTED,
      payload: { clearItems: false },
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.removeUserContactsListenerRequested()).toEqual(expectedAction);
  });

  test('updateUserContactsRequested', () => {
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
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.updateUserContactsRequested(uid, contactId, name, phone)).toEqual(
      expectedAction,
    );
  });

  test('removeUserContactsRequested', () => {
    const uid = '1';
    const contactId = '123';
    const expectedAction = {
      type: constants.actionTypes.REMOVE_REQUESTED,
      payload: { uid, contactId },
      meta: { type: constants.metaTypes.userContacts },
    };
    expect(actions.removeUserContactsRequested(uid, contactId)).toEqual(expectedAction);
  });
});
