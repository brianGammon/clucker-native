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
  takeLatest,
  select,
  race,
} from 'redux-saga/effects';
// $FlowFixMe
import firebase from 'react-native-firebase';
// eslint-disable-next-line
import ImageResizer from 'react-native-image-resizer';
import eggsByChickenSelector from '../selectors/eggsByChickenSelector';
import NavigationService from '../navigation/NavigationService';
import {
  actionTypes as a,
  metaTypes,
  eventTypes as e,
  authTypes,
} from './constants';
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
      yield call([NavigationService, NavigationService.navigate], 'SignedIn');
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
      put({ type: a.CLEAR_ALL_FLOCKS }),
    ]);
    // then call firebase sign out
    const auth = firebase.auth();
    yield call([auth, auth.signOut]);
  }
}

export function* performAuthAction(action) {
  const auth = firebase.auth();
  // Default to sign in action
  let func = auth.signInAndRetrieveDataWithEmailAndPassword;

  switch (action.meta.type) {
    case authTypes.signUp:
      func = auth.createUserAndRetrieveDataWithEmailAndPassword;
      break;
    case authTypes.resetPassword:
      func = auth.sendPasswordResetEmail;
      break;
    default:
      break;
  }
  try {
    yield call([auth, func], ...action.payload);
    yield put({
      type: a.AUTH_ACTION_FULFILLED,
      meta: { type: action.meta.type },
    });
  } catch (error) {
    yield put({
      type: a.AUTH_ACTION_REJECTED,
      payload: { error },
      meta: { type: action.meta.type },
    });
  }
}

export function* watchAuthActionRequested() {
  yield takeLatest(a.AUTH_ACTION_REQUESTED, performAuthAction);
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

export function* syncFlocks(action) {
  const ref = firebase.database().ref();
  const { added, deleted } = action.payload;
  try {
    // Clear from state any flocks removed from userSettings
    yield all(deleted.map(key => put({ type: a.CLEAR_FLOCK, payload: key })));

    // Add to state any flocks added to UserSettings
    const addResult = yield all(added.map((key) => {
      const childRef = ref.child(`flocks/${key}`);
      return call([childRef, ref.once], 'value');
    }));

    // Send the result of each to the reducer
    yield all(addResult.map((snap) => {
      const value = snap.val() || {};
      const { key } = snap;
      return put({ type: a.SET_FLOCK, payload: { [key]: value } });
    }));

    // Mark as initialized
    yield put({ type: a.SYNC_FLOCKS_FULFILLED });
  } catch (error) {
    yield put({ type: a.SYNC_FLOCKS_REJECTED, payload: { error } });
  }
}

export function* watchSyncFlocks() {
  yield takeEvery(a.SYNC_FLOCKS_REQUESTED, syncFlocks);
}

export function* joinFlock(action) {
  const { userId, flockId } = action.payload;
  // call firebaseRef.once to get a snap of that flock
  const ref = firebase.database().ref(`flocks/${flockId}`);
  const snap = yield call([ref, ref.once]);
  if (snap.val()) {
    const userSettings = yield select(state => state.userSettings.data);
    const flocks = userSettings.flocks || {};
    const newUserSettings = {
      ...userSettings,
      currentFlockId: flockId,
      flocks: { ...flocks, [flockId]: true },
    };
    yield put(
      actions.firebaseUpdateRequested(
        { userId, userSettings: newUserSettings },
        metaTypes.userSettings,
      ),
    );
    yield put({ type: a.JOIN_FLOCK_FULFILLED });
    yield call([NavigationService, NavigationService.navigate], 'Stats');
  } else {
    yield put({
      type: a.JOIN_FLOCK_REJECTED,
      payload: { error: new Error(`Flock ID '${flockId}' not found`) },
    });
  }
}

export function* watchJoinFlockRequested() {
  yield takeLatest(a.JOIN_FLOCK_REQUESTED, joinFlock);
}

export function* addFlock(action) {
  const { userId, name } = action.payload;
  const ref = firebase.database().ref('flocks');
  try {
    // const newRef = yield call([ref, ref.push]);
    const newRef = ref.push();
    yield call([newRef, newRef.set], { name, ownedBy: userId });
    const userSettings = yield select(state => state.userSettings.data);
    const flocks = userSettings.flocks || {};
    const newUserSettings = {
      ...userSettings,
      currentFlockId: newRef.key,
      flocks: { ...flocks, [newRef.key]: true },
    };
    yield put(
      actions.firebaseUpdateRequested(
        { userId, userSettings: newUserSettings },
        metaTypes.userSettings,
      ),
    );
    yield put({ type: a.ADD_FLOCK_FULFILLED });
    yield call([NavigationService, NavigationService.navigate], 'Stats');
  } catch (error) {
    yield put({
      type: a.ADD_FLOCK_REJECTED,
      payload: { error },
    });
  }
}

export function* watchAddFlockRequested() {
  yield takeLatest(a.ADD_FLOCK_REQUESTED, addFlock);
}

export function* switchFlock(action) {
  const { userId, userSettings } = action.payload;
  yield all([
    put(actions.firebaseListenRemoved(true, metaTypes.chickens)),
    put(actions.firebaseListenRemoved(true, metaTypes.eggs)),
  ]);
  yield put(actions.firebaseUpdateRequested({ userId, userSettings }, metaTypes.userSettings));
  while (true) {
    const updateAction = yield take(a.UPDATE_FULFILLED);
    if (updateAction.meta.type === metaTypes.userSettings) {
      yield put({ type: a.SWITCH_FLOCK_FULFILLED, resetStack: true, routeName: 'FlockStats' });
      break;
    }
  }
}

export function* watchSwitchFlockRequested() {
  yield takeLatest(a.SWITCH_FLOCK_REQUESTED, switchFlock);
}

export function* unlinkFlock(action) {
  const { userId, userSettings, flockId } = action.payload;
  const { currentFlockId } = userSettings;
  let newCurrentFlockId = currentFlockId;
  let resetStack = false;

  if (currentFlockId && currentFlockId === flockId) {
    newCurrentFlockId = null;
    yield all([
      put(actions.firebaseListenRemoved(true, metaTypes.chickens)),
      put(actions.firebaseListenRemoved(true, metaTypes.eggs)),
    ]);
    resetStack = true;
  }

  const { [flockId]: removed, ...rest } = userSettings.flocks;
  const newUserSettings = {
    ...userSettings,
    currentFlockId: newCurrentFlockId,
    flocks: rest,
  };
  yield put(
    actions.firebaseUpdateRequested(
      { userId, userSettings: newUserSettings },
      metaTypes.userSettings,
    ),
  );
  yield put({ type: a.UNLINK_FLOCK_FULFILLED, resetStack });
}

export function* watchUnlinkFlockRequested() {
  yield takeLatest(a.UNLINK_FLOCK_REQUESTED, unlinkFlock);
}

export function* deleteFlock(action) {
  const { userId, userSettings, flockId } = action.payload;
  const { currentFlockId } = userSettings;
  let resetStack = false;

  if (currentFlockId && currentFlockId === flockId) {
    yield all([
      put(actions.firebaseListenRemoved(true, metaTypes.chickens)),
      put(actions.firebaseListenRemoved(true, metaTypes.eggs)),
    ]);
    resetStack = true;
  }

  const baseRef = firebase.database().ref();
  const userSettingsRef = baseRef.child('userSettings');
  const queryRef = userSettingsRef
    .orderByChild(`flocks/${flockId}`)
    .equalTo(true);
  try {
    const snapshot = yield call([queryRef, queryRef.once], 'value');
    const updates = {};
    snapshot.forEach((child) => {
      const { key } = child;
      const { currentFlockId: curr } = child.val();
      if (curr && curr === flockId) {
        updates[`${key}/currentFlockId`] = null;
      }
      updates[`${key}/flocks/${flockId}`] = null;
    });

    yield call([userSettingsRef, userSettingsRef.update], updates);
    let removalRef = baseRef.child(`eggs/${flockId}`);
    yield call([removalRef, removalRef.remove]);
    removalRef = baseRef.child(`chickens/${flockId}`);
    yield call([removalRef, removalRef.remove]);
    removalRef = baseRef.child(`flocks/${flockId}`);
    yield call([removalRef, removalRef.remove]);
    const deletedFlocksRef = baseRef.child(
      `deletedFlocks/${userId}/${flockId}`,
    );
    yield call([deletedFlocksRef, deletedFlocksRef.set], true);
    yield put({ type: a.DELETE_FLOCK_FULFILLED, resetStack });
  } catch (error) {
    yield put({ type: a.DELETE_FLOCK_REJECTED, payload: { error } });
  }
}

export function* watchDeleteFlockRequested() {
  yield takeLatest(a.DELETE_FLOCK_REQUESTED, deleteFlock);
}

export function* deleteFromStorage(paths) {
  yield put({ type: a.STORAGE_DELETE_REQUESTED });
  const ref = firebase.storage().ref();
  try {
    yield all(
      paths.map((path) => {
        const deleteRef = ref.child(path);
        return call([deleteRef, deleteRef.delete]);
      }),
    );
    yield put({ type: a.STORAGE_DELETE_FULFILLED });
  } catch (error) {
    if (error.code && error.code === 'storage/object-not-found') {
      yield put({ type: a.STORAGE_DELETE_FULFILLED });
    } else {
      yield put({ type: a.STORAGE_DELETE_REJECTED, payload: { error } });
    }
  }
}

export function* addToStorage(userId, flockId, image) {
  yield put({ type: a.STORAGE_UPLOAD_REQUESTED });
  const ref = firebase.storage().ref();
  const thumbnail = { height: 128, width: 128, path: null };

  // Generate a thumbnail
  const resizedImage = yield call(
    [ImageResizer, ImageResizer.createResizedImage],
    image.path,
    thumbnail.width,
    thumbnail.height,
    'JPEG',
    100,
    0,
  );
  thumbnail.path = resizedImage.path;

  const images = [image, thumbnail];
  const id = Math.floor(Date.now() / 1000).toString();
  try {
    const results = yield all(
      images.map((img) => {
        const fileName = `${id}-${img.width}x${img.height}`;
        const putRef = ref.child(
          `uploads/user:${userId}/flock:${flockId}/${fileName}`,
        );
        return call([putRef, putRef.putFile], img.path);
      }),
    );
    yield put({ type: a.STORAGE_UPLOAD_FULFILLED, payload: results });
  } catch (error) {
    yield put({ type: a.STORAGE_UPLOAD_REJECTED, payload: { error } });
  }
}

export function* deleteChicken(action) {
  const { chickenId, flockId, paths } = action.payload;

  try {
    // remove the chicken's images from storage
    const task = yield fork(deleteFromStorage, paths);
    const { errorResult } = yield race({
      successResult: take(a.STORAGE_DELETE_FULFILLED),
      errorResult: take(a.STORAGE_DELETE_REJECTED),
    });

    if (errorResult) {
      yield cancel(task);
      throw errorResult.payload.error;
    }

    // run the egg selector for the chickenId
    const eggs = yield select(state => eggsByChickenSelector(state.eggs.data, chickenId));

    // loop over eggs build a list of updates to null
    const updates = {};
    Object.keys(eggs || {}).forEach((key) => {
      updates[key] = null;
    });

    // call the egg deletion
    const ref = firebase.database().ref();
    const eggsRef = ref.child(`/eggs/${flockId}`);
    yield call([eggsRef, eggsRef.update], updates);

    // delete the chicken
    const chickensRef = ref.child(`/chickens/${flockId}/${chickenId}`);
    yield call([chickensRef, chickensRef.remove]);

    yield put({ type: a.DELETE_CHICKEN_FULFILLED });
  } catch (error) {
    yield put({ type: a.DELETE_CHICKEN_REJECTED, payload: { error } });
  }
}

export function* watchDeleteChickenRequested() {
  yield takeLatest(a.DELETE_CHICKEN_REQUESTED, deleteChicken);
}

export function* resetNavigation(action) {
  const { resetStack, routeName } = action;
  if (resetStack) {
    yield call([NavigationService, NavigationService.resetTabs], routeName);
  }
}

export function* watchFlockActionsComplete() {
  yield takeLatest(
    [a.DELETE_FLOCK_FULFILLED, a.UNLINK_FLOCK_FULFILLED, a.SWITCH_FLOCK_FULFILLED],
    resetNavigation,
  );
}

export function* saveChicken(action) {
  const {
    flockId,
    chickenId,
    data: chicken,
    newImage,
    userId,
  } = action.payload;

  // pull in previous chicken state
  const prevChickenState = yield select(
    state => state.chickens.data[chickenId],
  );

  try {
    // Figure out if there are images to remove
    if (
      prevChickenState
      && prevChickenState.photoPath
      && prevChickenState.photoPath !== ''
    ) {
      // updated chicken doesn't have a photo (removed by user), or a new image was selected
      if (!chicken.photoPath || chicken.photoPath === '' || newImage) {
        const task = yield fork(deleteFromStorage, [
          prevChickenState.photoPath,
          prevChickenState.thumbnailPath,
        ]);
        const { errorResult } = yield race({
          successResult: take(a.STORAGE_DELETE_FULFILLED),
          errorResult: take(a.STORAGE_DELETE_REJECTED),
        });

        if (errorResult) {
          yield cancel(task);
          throw errorResult.payload.error;
        }
      }
    }

    // Figure out if there is a new image to process
    if (newImage) {
      const task = yield fork(addToStorage, userId, flockId, newImage);
      const { successResult, errorResult } = yield race({
        successResult: take(a.STORAGE_UPLOAD_FULFILLED),
        errorResult: take(a.STORAGE_UPLOAD_REJECTED),
      });

      if (errorResult) {
        yield cancel(task);
        throw errorResult.payload.error;
      }
      const images = successResult.payload;
      chicken.photoPath = images[0].ref;
      chicken.photoUrl = images[0].downloadURL;
      chicken.thumbnailPath = images[1].ref;
      chicken.thumbnailUrl = images[1].downloadURL;
    }

    // Default to create action
    let firebaseAction = actions.firebaseCreateRequested;
    if (chickenId) {
      // Updating chicken
      firebaseAction = actions.firebaseUpdateRequested;
    }
    // yield call([console, console.log], { flockId, chickenId, data: chicken });
    yield put(
      firebaseAction({ flockId, chickenId, data: chicken }, metaTypes.chickens),
    );
  } catch (error) {
    yield put(actions.firebaseUpdateRejected(error, metaTypes.chickens));
  }
}

export function* watchSaveChickenRequested() {
  yield takeLatest(a.SAVE_CHICKEN_REQUESTED, saveChicken);
}

export default function* rootSaga() {
  yield all([
    watchAuthChanged(),
    watchAuthActionRequested(),
    watchSignOutRequested(),
    watchListener('userSettings'),
    watchListener('chickens'),
    watchListener('eggs'),
    watchCreateRequested(),
    watchUpdateRequested(),
    watchRemoveRequested(),
    watchSyncFlocks(),
    watchJoinFlockRequested(),
    watchAddFlockRequested(),
    watchUnlinkFlockRequested(),
    watchDeleteFlockRequested(),
    watchDeleteChickenRequested(),
    watchFlockActionsComplete(),
    watchSaveChickenRequested(),
    watchSwitchFlockRequested(),
  ]);
}
