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
import { actionTypes as a, metaTypes, eventTypes } from './constants';
import * as actions from './actions';

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

export function getChickensPath({ flockId, chickenId }) {
  return `chickens/${flockId}/${chickenId}`;
}

export function getChickensUpdate({ flockId, chickenId, updatedChicken }) {
  return {
    [`chickens/${flockId}/${chickenId}`]: updatedChicken,
  };
}

export function getUserSettingsUpdate({
  uid,
  displayName,
  currentFlockId,
  flocks,
}) {
  return {
    [`userSettings/${uid}/displayName`]: displayName,
    [`userSettings/${uid}/currentFlockId`]: currentFlockId,
    [`userSettings/${uid}/flocks`]: flocks,
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
        eventType: eventTypes.CHILD_ADDED,
        key: snap.key,
        data: snap.val(),
      });
    });

    ref.on('child_changed', (snap) => {
      emit({
        eventType: eventTypes.CHILD_CHANGED,
        key: snap.key,
        data: snap.val(),
      });
    });

    ref.on('child_removed', (snap) => {
      emit({ eventType: eventTypes.CHILD_REMOVED, key: snap.key });
    });
    return () => {
      ref.off();
    };
  }, buffers.expanding(1));
  return listener;
}

export function getUpdateAction(event, metaType) {
  switch (event.eventType) {
    case eventTypes.CHILD_ADDED:
      return actions.firebaseListenChildAdded(event.key, event.data, metaType);
    case eventTypes.CHILD_CHANGED:
      return actions.firebaseListenChildChanged(
        event.key,
        event.data,
        metaType,
      );
    case eventTypes.CHILD_REMOVED:
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
      const { key } = snap;
      yield put(actions.firebaseListenFulfilled({ key, data }, metaType));
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
    watchListener('userSettings'),
    watchListener('chickens'),
    watchListener('eggs'),
    watchUpdateRequested(),
    watchGetFlock(),
  ]);
}
