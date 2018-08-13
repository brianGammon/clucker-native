import { eventChannel, buffers } from 'redux-saga';
import {
  put,
  take,
  call,
  fork,
  cancel,
  flush,
  all,
  takeEvery,
} from 'redux-saga/effects';
// $FlowFixMe
import firebase from 'react-native-firebase';
import { actionTypes as a, metaTypes, eventTypes as e } from './constants';
import * as actions from './actions';

export function* addItems(path, data, metaType) {
  try {
    const ref = firebase.database().ref(path);
    yield call([ref, ref.push], data);
    yield put(actions.firebaseCreateFulfilled(metaType));
  } catch (error) {
    yield put(actions.firebaseCreateRejected(error, metaType));
  }
}

export function* updateItems(updates, metaType) {
  try {
    const ref = firebase.database().ref();
    yield call([ref, ref.update], updates);
    yield put(actions.firebaseUpdateFulfilled(metaType));
  } catch (error) {
    yield put(actions.firebaseUpdateRejected(error, metaType));
  }
}

export function getUserSettingsPath({ uid }) {
  return `userSettings/${uid}`;
}

export function getUserSettingsUpdate({ userId, userSettings }) {
  return {
    [`userSettings/${userId}`]: userSettings,
  };
}

export function getChickensPath({ flockId, chickenId }) {
  let path = `chickens/${flockId}`;
  if (chickenId) {
    path += `/${chickenId}`;
  }
  return path;
}

export function getChickensUpdate({ flockId, chickenId, data }) {
  return {
    [`chickens/${flockId}/${chickenId}`]: data,
  };
}

export function getEggsPath({ flockId, eggId }) {
  let path = `eggs/${flockId}`;
  if (eggId) {
    path += `/${eggId}`;
  }
  return path;
}

export function getEggsUpdate({ flockId, eggId, data }) {
  return {
    [`eggs/${flockId}/${eggId}`]: data,
  };
}

export function* removeItem(path, metaType) {
  try {
    const ref = firebase.database().ref(path);
    yield call([ref, ref.remove]);
    yield put(actions.firebaseRemoveFulfilled(metaType));
  } catch (error) {
    yield put(actions.firebaseRemoveRejected(error, metaType));
  }
}

export function* watchCreateRequested() {
  while (true) {
    const action = yield take(a.CREATE_REQUESTED);
    let getPath = null;
    switch (action.meta.type) {
      case metaTypes.chickens:
        getPath = getChickensPath;
        break;
      case metaTypes.eggs:
        getPath = getEggsPath;
        break;
      default:
        break;
    }
    if (typeof getPath === 'function') {
      const path = yield call(getPath, action.payload);
      yield fork(addItems, path, action.payload.data, action.meta.type);
    }
  }
}

export function* watchUpdateRequested() {
  while (true) {
    const action = yield take(a.UPDATE_REQUESTED);
    let getUpdates = null;
    switch (action.meta.type) {
      case metaTypes.userSettings:
        getUpdates = getUserSettingsUpdate;
        break;
      case metaTypes.chickens:
        getUpdates = getChickensUpdate;
        break;
      case metaTypes.eggs:
        getUpdates = getEggsUpdate;
        break;
      default:
        break;
    }
    if (typeof getUpdates === 'function') {
      const updates = yield call(getUpdates, action.payload);
      yield fork(updateItems, updates, action.meta.type);
    }
  }
}

export function* watchRemoveRequested() {
  while (true) {
    const action = yield take(a.REMOVE_REQUESTED);
    let getPath = null;
    switch (action.meta.type) {
      case metaTypes.userSettings:
        getPath = getUserSettingsPath;
        break;
      case metaTypes.chickens:
        getPath = getChickensPath;
        break;
      case metaTypes.eggs:
        getPath = getEggsPath;
        break;
      default:
        break;
    }

    if (typeof getPath === 'function') {
      const path = yield call(getPath, action.payload);
      yield fork(removeItem, path, action.meta.type);
    }
  }
}

export function createEventChannel(ref) {
  const listener = eventChannel((emit) => {
    ref.on('child_added', (snap) => {
      emit({
        eventType: e.CHILD_ADDED_EVENT,
        key: snap.key,
        data: snap.val(),
      });
    });

    ref.on('child_changed', (snap) => {
      emit({
        eventType: e.CHILD_CHANGED_EVENT,
        key: snap.key,
        data: snap.val(),
      });
    });

    ref.on('child_removed', (snap) => {
      emit({ eventType: e.CHILD_REMOVED_EVENT, key: snap.key });
    });
    return () => {
      ref.off();
    };
  }, buffers.expanding(1));
  return listener;
}

export function createAuthEventChannel() {
  let unsubscriber;
  const listener = eventChannel((emit) => {
    unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      emit({ eventType: e.AUTH_STATUS_CHANGED, user });
    });
    return () => {
      unsubscriber();
    };
  }, buffers.expanding(1));
  return listener;
}

export function* watchAuthChanged() {
  const chan = yield call(createAuthEventChannel);
  while (true) {
    const event = yield take(chan);
    yield put(actions.authStatusChanged(event.user));
    if (event.user) {
      yield put(actions.listenToUserSettings(event.user.uid));
    } else {
      yield put(actions.firebaseRemoveAllListenersRequested());
    }
  }
}

export function* watchSignOutRequested() {
  while (true) {
    yield take(a.SIGN_OUT_REQUESTED);
    // clear flocks and turn off all listeners first
    yield all([
      put(actions.firebaseRemoveAllListenersRequested()),
      put({ type: a.CLEAR_FLOCKS }),
    ]);
    // then call firebase sign out
    const auth = firebase.auth();
    yield call([auth, auth.signOut]);
  }
}

export function* watchSignInRequested() {
  while (true) {
    const action = yield take(a.SIGN_IN_REQUESTED);

    // then call firebase sign out
    try {
      const auth = firebase.auth();
      yield call(
        [auth, auth.signInAndRetrieveDataWithEmailAndPassword],
        action.payload.email,
        action.payload.password,
      );
      yield put({ type: a.SIGN_IN_FULFILLED });
    } catch (error) {
      yield put(actions.signInRejected(error));
    }
  }
}

export function getUpdateAction(event, metaType) {
  switch (event.eventType) {
    case e.CHILD_ADDED_EVENT:
      return actions.firebaseListenChildAdded(event.key, event.data, metaType);
    case e.CHILD_CHANGED_EVENT:
      return actions.firebaseListenChildChanged(
        event.key,
        event.data,
        metaType,
      );
    case e.CHILD_REMOVED_EVENT:
      return actions.firebaseListenChildRemoved(event.key, metaType);
    default:
      return {};
  }
}

export function* getDataAndListenToChannel(ref, metaType) {
  const chan = yield call(createEventChannel, ref);
  try {
    try {
      const snap = yield call([ref, ref.once], 'value');
      yield flush(chan);
      const data = snap.val() || {};
      yield put(actions.firebaseListenFulfilled(data, metaType));
    } catch (error) {
      yield put(actions.firebaseListenRejected(error, metaType));
    }
    while (true) {
      const event = yield take(chan);
      yield put(getUpdateAction(event, metaType));
    }
  } finally {
    chan.close();
  }
}

export function* watchListener(metaType) {
  while (true) {
    const listenRequestAction = yield take(a.LISTEN_REQUESTED);
    if (listenRequestAction.meta.type === metaType) {
      let task = yield fork(
        getDataAndListenToChannel,
        listenRequestAction.payload.ref,
        metaType,
      );
      while (true) {
        const action = yield take([
          a.REMOVE_LISTENER_REQUESTED,
          a.LISTEN_REQUESTED,
          a.REMOVE_ALL_LISTENERS_REQUESTED,
        ]);

        if (
          action.type === a.REMOVE_ALL_LISTENERS_REQUESTED
          || action.meta.type === metaType
        ) {
          yield cancel(task);
          yield put(
            actions.firebaseListenRemoved(!!action.payload.clearData, metaType),
          );

          if (action.type === a.LISTEN_REQUESTED) {
            task = yield fork(
              getDataAndListenToChannel,
              action.payload.ref,
              metaType,
            );
          } else {
            break;
          }
        }
      }
    }
  }
}

export function* getFlock(action) {
  const { ref } = action.payload;
  try {
    const snap = yield call([ref, ref.once], 'value');
    const value = snap.val() || {};
    const { key } = snap;
    yield put(actions.getFlockFulfilled({ [key]: value }, metaTypes.flocks));
  } catch (error) {
    yield put(actions.getFlockRejected(error, metaTypes.flocks));
  }
}

export function* watchGetFlock() {
  yield takeEvery(a.GET_FLOCK_REQUESTED, getFlock);
}

export default function* rootSaga() {
  yield all([
    watchAuthChanged(),
    watchSignInRequested(),
    watchSignOutRequested(),
    watchListener('userSettings'),
    watchListener('chickens'),
    watchListener('eggs'),
    watchCreateRequested(),
    watchUpdateRequested(),
    watchRemoveRequested(),
    watchGetFlock(),
  ]);
}
