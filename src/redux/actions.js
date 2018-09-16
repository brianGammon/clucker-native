import firebase from 'react-native-firebase';
import { metaTypes, authTypes, actionTypes as a } from './constants';

export function firebaseListenRequested(ref, metaType) {
  return {
    type: a.LISTEN_REQUESTED,
    payload: { ref },
    meta: { type: metaType },
  };
}

export function firebaseListenRejected(error, metaType) {
  return {
    type: a.LISTEN_REJECTED,
    payload: { error },
    meta: { type: metaType },
  };
}

export function firebaseListenFulfilled(data, metaType) {
  return {
    type: a.LISTEN_FULFILLED,
    payload: data,
    meta: { type: metaType },
  };
}

export function firebaseListenChildAdded(key, data, metaType) {
  return {
    type: a.CHILD_ADDED,
    payload: { key, data },
    meta: { type: metaType },
  };
}

export function firebaseListenChildChanged(key, data, metaType) {
  return {
    type: a.CHILD_CHANGED,
    payload: { key, data },
    meta: { type: metaType },
  };
}

export function firebaseListenChildRemoved(key, metaType) {
  return {
    type: a.CHILD_REMOVED,
    payload: { key },
    meta: { type: metaType },
  };
}

export function firebaseCreateRequested(payload, metaType) {
  return {
    type: a.CREATE_REQUESTED,
    payload,
    meta: { type: metaType },
  };
}

export function firebaseCreateRejected(error, metaType) {
  return {
    type: a.CREATE_REJECTED,
    payload: { error },
    meta: { type: metaType },
  };
}

export function firebaseCreateFulfilled(metaType) {
  return {
    type: a.CREATE_FULFILLED,
    payload: {},
    meta: { type: metaType },
  };
}

export function firebaseUpdateRequested(payload, metaType) {
  return {
    type: a.UPDATE_REQUESTED,
    payload,
    meta: { type: metaType },
  };
}

export function firebaseUpdateRejected(error, metaType) {
  return {
    type: a.UPDATE_REJECTED,
    payload: { error },
    meta: { type: metaType },
  };
}

export function firebaseUpdateFulfilled(metaType) {
  return {
    type: a.UPDATE_FULFILLED,
    payload: {},
    meta: { type: metaType },
  };
}

export function firebaseRemoveRequested(payload, metaType) {
  return {
    type: a.REMOVE_REQUESTED,
    payload,
    meta: { type: metaType },
  };
}

export function firebaseRemoveRejected(error, metaType) {
  return {
    type: a.REMOVE_REJECTED,
    payload: { error },
    meta: { type: metaType },
  };
}

export function firebaseRemoveFulfilled(metaType) {
  return {
    type: a.REMOVE_FULFILLED,
    payload: {},
    meta: { type: metaType },
  };
}

export function firebaseListenRemoved(clearData, metaType) {
  return {
    type: a.LISTEN_REMOVED,
    payload: { clearData },
    meta: { type: metaType },
  };
}

export function firebaseRemoveListenerRequested(clearData, metaType) {
  return {
    type: a.REMOVE_LISTENER_REQUESTED,
    payload: { clearData },
    meta: { type: metaType },
  };
}

export function firebaseRemoveAllListenersRequested() {
  return {
    type: a.REMOVE_ALL_LISTENERS_REQUESTED,
    payload: { clearData: true },
  };
}

export function authStatusChanged(user) {
  const status = user ? a.AUTH_STATUS_LOGGED_IN : a.AUTH_STATUS_LOGGED_OUT;
  return {
    type: status,
    payload: user,
  };
}

export function signInRequested(email, password) {
  return {
    type: a.AUTH_ACTION_REQUESTED,
    payload: [email, password],
    meta: { type: authTypes.signIn },
  };
}

export function signUpRequested(email, password) {
  return {
    type: a.AUTH_ACTION_REQUESTED,
    payload: [email, password],
    meta: { type: authTypes.signUp },
  };
}

export function resetPasswordRequested(email) {
  return {
    type: a.AUTH_ACTION_REQUESTED,
    payload: [email],
    meta: { type: authTypes.resetPassword },
  };
}

export function listenToChickens(userId) {
  const ref = firebase.database().ref(`userData/${userId}/chickens`);
  return firebaseListenRequested(ref, metaTypes.chickens);
}

export function listenToEggs(userId) {
  const ref = firebase.database().ref(`userData/${userId}/eggs`);
  return firebaseListenRequested(ref, metaTypes.eggs);
}

export function setInitialUrl(url) {
  return {
    type: a.SET_INITIAL_URL,
    payload: url,
  };
}

export function removeInitialUrl() {
  return {
    type: a.REMOVE_INITIAL_URL,
  };
}
