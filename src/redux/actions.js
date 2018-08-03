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

export function firebaseListenFulfilled({ key, value }, metaType) {
  return {
    type: a.LISTEN_FULFILLED,
    payload: { key, items: value },
    meta: { type: metaType },
  };
}

export function firebaseListenChildAdded(id, value, metaType) {
  return {
    type: a.LISTEN_CHILD_ADDED,
    payload: { id, value },
    meta: { type: metaType },
  };
}

export function firebaseListenChildChanged(id, value, metaType) {
  return {
    type: a.LISTEN_CHILD_CHANGED,
    payload: { id, value },
    meta: { type: metaType },
  };
}

export function firebaseListenChildRemoved(id, metaType) {
  return {
    type: a.LISTEN_CHILD_REMOVED,
    payload: { id },
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

export function firebaseListenRemoved(clearItems, metaType) {
  return {
    type: a.LISTEN_REMOVED,
    payload: { clearItems },
    meta: { type: metaType },
  };
}

export function firebaseRemoveListenerRequested(clearItems, metaType) {
  return {
    type: a.REMOVE_LISTENER_REQUESTED,
    payload: { clearItems },
    meta: { type: metaType },
  };
}

export function firebaseRemoveAllListenersRequested() {
  return {
    type: a.REMOVE_ALL_LISTENERS_REQUESTED,
    payload: { clearItems: true },
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

export function updateUserSettingsRequested(uid, displayName, currentFlockId, flocks) {
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
