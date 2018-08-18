import firebase from 'react-native-firebase';
import { metaTypes, actionTypes as a } from './constants';

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
    type: a.SIGN_IN_REQUESTED,
    payload: { email, password },
  };
}

export function signInRejected(error) {
  return {
    type: a.SIGN_IN_REJECTED,
    payload: { error },
  };
}

export function listenToChickens(flockId) {
  const ref = firebase.database().ref(`chickens/${flockId}`);
  return firebaseListenRequested(ref, metaTypes.chickens);
}

export function listenToEggs(flockId) {
  const ref = firebase.database().ref(`eggs/${flockId}`);
  return firebaseListenRequested(ref, metaTypes.eggs);
}

export function listenToUserSettings(uid) {
  const ref = firebase.database().ref(`userSettings/${uid}`);
  return firebaseListenRequested(ref, metaTypes.userSettings);
}

export function removeUserSettingsListenerRequested() {
  return firebaseRemoveListenerRequested(false, metaTypes.userSettings);
}

export function removeUserSettingsRequested(uid) {
  return firebaseRemoveRequested({ uid }, metaTypes.userSettings);
}

// TODO: remove refs from actions module
export function getFlock(flockId) {
  const ref = firebase.database().ref(`flocks/${flockId}`);
  return {
    type: a.GET_FLOCK_REQUESTED,
    payload: { ref },
    meta: { type: metaTypes.flocks },
  };
}

export function getFlockRejected(error) {
  return {
    type: a.GET_FLOCK_REJECTED,
    payload: { error },
    meta: { type: metaTypes.flocks },
  };
}

export function getFlockFulfilled(flock) {
  return {
    type: a.GET_FLOCK_FULFILLED,
    payload: flock,
    meta: { type: metaTypes.flocks },
  };
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
