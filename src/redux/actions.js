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

export function firebaseListenFulfilled({ key, data }, metaType) {
  return {
    type: a.LISTEN_FULFILLED,
    payload: { key, data },
    meta: { type: metaType },
  };
}

export function firebaseListenChildAdded(key, data, metaType) {
  return {
    type: a.LISTEN_CHILD_ADDED,
    payload: { key, data },
    meta: { type: metaType },
  };
}

export function firebaseListenChildChanged(key, data, metaType) {
  return {
    type: a.LISTEN_CHILD_CHANGED,
    payload: { key, data },
    meta: { type: metaType },
  };
}

export function firebaseListenChildRemoved(key, metaType) {
  return {
    type: a.LISTEN_CHILD_REMOVED,
    payload: { key },
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

// TODO: remove this, no need
export function updateUserSettingsRequested(
  uid,
  displayName,
  currentFlockId,
  flocks,
) {
  return firebaseUpdateRequested(
    {
      uid,
      displayName,
      currentFlockId,
      flocks,
    },
    metaTypes.userSettings,
  );
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
