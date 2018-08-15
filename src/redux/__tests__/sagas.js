import firebase from 'react-native-firebase';
import { cloneableGenerator, createMockTask } from 'redux-saga/utils';
import {
  put,
  take,
  call,
  fork,
  cancel,
  flush,
  all,
  select,
  takeLatest,
} from 'redux-saga/effects';
import * as sagas from '../sagas';
import * as actions from '../actions';
import { metaTypes, eventTypes, actionTypes } from '../constants';

describe('saga tests', () => {
  test('addItems - regular stream - success and failure', () => {
    const path = 'chickens/flock1';
    const data = { x: true };
    const metaType = 'chickens';
    const ref = firebase.database().ref(path);
    const generator = cloneableGenerator(sagas.addItems)(path, data, metaType);
    expect(generator.next().value).toEqual(call([ref, ref.push], data));

    const successGenerator = generator.clone();
    expect(successGenerator.next().value).toEqual(
      put(actions.firebaseCreateFulfilled(metaType)),
    );
    expect(successGenerator.next().done).toEqual(true);

    const failGenerator = generator.clone();
    const error = new Error('An error occured');
    expect(failGenerator.throw(error).value).toEqual(
      put(actions.firebaseCreateRejected(error, metaType)),
    );
    expect(failGenerator.next().done).toEqual(true);
  });

  test('updateItems - regular stream - success and failure', () => {
    const updates = { x: true };
    const metaType = 'someType';
    const ref = firebase.database().ref();
    const generator = cloneableGenerator(sagas.updateItems)(updates, metaType);
    expect(generator.next().value).toEqual(call([ref, ref.update], updates));

    const successGenerator = generator.clone();
    expect(successGenerator.next().value).toEqual(
      put(actions.firebaseUpdateFulfilled(metaType)),
    );
    expect(successGenerator.next().done).toEqual(true);

    const failGenerator = generator.clone();
    const error = new Error('An error occured');
    expect(failGenerator.throw(error).value).toEqual(
      put(actions.firebaseUpdateRejected(error, metaType)),
    );
    expect(failGenerator.next().done).toEqual(true);
  });

  test('getUserSettingsPath', () => {
    const uid = '1';
    const path = `userSettings/${uid}`;
    expect(sagas.getUserSettingsPath({ uid })).toEqual(path);
  });

  test('getUserSettingsUpdate', () => {
    const updates = {
      userId: 'userId1',
      userSettings: {
        currentFlockId: 'flockId1',
        flocks: { flockId1: true },
      },
    };

    expect(sagas.getUserSettingsUpdate(updates)).toMatchSnapshot();
  });

  test('getChickensPath for remove', () => {
    const flockId = 'flock1';
    const chickenId = 'chicken1';
    const path = `chickens/${flockId}/${chickenId}`;
    expect(sagas.getChickensPath({ flockId, chickenId })).toEqual(path);
  });

  test('getChickensPath for create', () => {
    const flockId = 'flock1';
    const path = `chickens/${flockId}`;
    expect(
      sagas.getChickensPath({ flockId, data: { key1: 'value1' } }),
    ).toEqual(path);
  });

  test('getChickensUpdate', () => {
    const updates = {
      flockId: 'flock1',
      chickenId: 'chicken1',
      data: {
        name: 'Test Chicken',
        breed: 'Some Breed',
        hatched: '2018-10-06',
      },
    };

    expect(sagas.getChickensUpdate(updates)).toMatchSnapshot();
  });

  test('getEggsPath for remove', () => {
    const flockId = 'flock1';
    const eggId = 'egg1';
    const path = `eggs/${flockId}/${eggId}`;
    expect(sagas.getEggsPath({ flockId, eggId })).toEqual(path);
  });

  test('getEggsPath for create', () => {
    const flockId = 'flock1';
    const path = `eggs/${flockId}`;
    expect(sagas.getEggsPath({ flockId, data: { key1: 'value1' } })).toEqual(
      path,
    );
  });

  test('getEggsUpdate', () => {
    const updates = {
      flockId: 'flock1',
      eggId: 'egg1',
      data: {
        chickenName: 'Test Chicken',
        chickenId: 'chicken1',
        date: '2018-10-06',
      },
    };

    expect(sagas.getEggsUpdate(updates)).toMatchSnapshot();
  });

  test('removeItem - regular stream - success and failure', () => {
    const path = 'a/b/c';
    const metaType = 'someType';
    const ref = firebase.database().ref(path);
    const generator = cloneableGenerator(sagas.removeItem)(path, metaType);
    expect(generator.next().value).toEqual(call([ref, ref.remove]));

    const successGenerator = generator.clone();
    expect(successGenerator.next().value).toEqual(
      put(actions.firebaseRemoveFulfilled(metaType)),
    );
    expect(successGenerator.next().done).toEqual(true);

    const failGenerator = generator.clone();
    const error = new Error('An error occured');
    expect(failGenerator.throw(error).value).toEqual(
      put(actions.firebaseRemoveRejected(error, metaType)),
    );
    expect(failGenerator.next().done).toEqual(true);
  });

  test(`watchCreateRequested ${metaTypes.chickens}`, () => {
    const generator = sagas.watchCreateRequested();
    const payload = {
      flockId: 'flock1',
      data: {
        name: 'Test Chicken',
        breed: 'Some Breed',
        hatched: '2018-10-06',
      },
    };
    const expectedPath = 'chickens/flock1';

    const action = actions.firebaseCreateRequested(payload, metaTypes.chickens);
    const selector = sagas.getChickensPath;
    const result = selector(payload);
    expect(generator.next().value).toEqual(take(actionTypes.CREATE_REQUESTED));
    expect(generator.next(action).value).toEqual(
      call(selector, action.payload),
    );
    expect(generator.next(result).value).toEqual(
      fork(sagas.addItems, expectedPath, payload.data, action.meta.type),
    );
  });

  test(`watchCreateRequested ${metaTypes.eggs}`, () => {
    const generator = sagas.watchCreateRequested();
    const payload = {
      flockId: 'flock1',
      data: {
        chickenName: 'Test Chicken',
        chickenId: 'chicken1',
        date: '2018-10-06',
      },
    };
    const expectedPath = 'eggs/flock1';

    const action = actions.firebaseCreateRequested(payload, metaTypes.eggs);
    const selector = sagas.getEggsPath;
    const result = selector(payload);
    expect(generator.next().value).toEqual(take(actionTypes.CREATE_REQUESTED));
    expect(generator.next(action).value).toEqual(
      call(selector, action.payload),
    );
    expect(generator.next(result).value).toEqual(
      fork(sagas.addItems, expectedPath, payload.data, action.meta.type),
    );
  });

  test('watchCreateRequested unknownType', () => {
    const generator = sagas.watchCreateRequested();

    // test non function case
    expect(generator.next().value).toEqual(take(actionTypes.CREATE_REQUESTED));
    expect(generator.next({ meta: { type: 'unknownType' } }).value).toEqual(
      take(actionTypes.CREATE_REQUESTED),
    );
  });

  test(`watchUpdateRequested ${metaTypes.userSettings}`, () => {
    const generator = sagas.watchUpdateRequested();
    const payload = {
      userId: 'user1',
      userSettings: {
        currentFlockId: 'flockId1',
        flocks: { flockId1: true },
      },
    };
    const expectedUpdates = {
      'userSettings/user1': payload.userSettings,
    };
    const action = actions.firebaseUpdateRequested(
      {
        userId: payload.userId,
        userSettings: payload.userSettings,
      },
      metaTypes.userSettings,
    );
    const selector = sagas.getUserSettingsUpdate;

    const result = selector(payload);
    expect(generator.next().value).toEqual(take(actionTypes.UPDATE_REQUESTED));
    expect(generator.next(action).value).toEqual(
      call(selector, action.payload),
    );
    expect(generator.next(result).value).toEqual(
      fork(sagas.updateItems, expectedUpdates, action.meta.type),
    );
  });

  test(`watchUpdateRequested ${metaTypes.chickens}`, () => {
    const generator = sagas.watchUpdateRequested();
    const payload = {
      flockId: 'flock1',
      chickenId: 'chicken1',
      data: {
        name: 'Test Chicken',
        breed: 'Some Breed',
        hatched: '2018-10-06',
      },
    };
    const expectedUpdates = {
      'chickens/flock1/chicken1': payload.data,
    };
    const action = actions.firebaseUpdateRequested(payload, metaTypes.chickens);
    const selector = sagas.getChickensUpdate;
    const result = selector(payload);
    expect(generator.next().value).toEqual(take(actionTypes.UPDATE_REQUESTED));
    expect(generator.next(action).value).toEqual(
      call(selector, action.payload),
    );
    expect(generator.next(result).value).toEqual(
      fork(sagas.updateItems, expectedUpdates, action.meta.type),
    );
  });

  test(`watchUpdateRequested ${metaTypes.eggs}`, () => {
    const generator = sagas.watchUpdateRequested();
    const payload = {
      flockId: 'flock1',
      eggId: 'egg1',
      data: {
        chickenName: 'Test Chicken',
        chickenId: 'chicken1',
        date: '2018-10-06',
      },
    };
    const expectedUpdates = {
      'eggs/flock1/egg1': payload.data,
    };
    const action = actions.firebaseUpdateRequested(payload, metaTypes.eggs);
    const selector = sagas.getEggsUpdate;
    const result = selector(payload);
    expect(generator.next().value).toEqual(take(actionTypes.UPDATE_REQUESTED));
    expect(generator.next(action).value).toEqual(
      call(selector, action.payload),
    );
    expect(generator.next(result).value).toEqual(
      fork(sagas.updateItems, expectedUpdates, action.meta.type),
    );
  });

  test('watchUpdateRequested unknownType', () => {
    const generator = sagas.watchUpdateRequested();

    // test non function case
    expect(generator.next().value).toEqual(take(actionTypes.UPDATE_REQUESTED));
    expect(generator.next({ meta: { type: 'unknownType' } }).value).toEqual(
      take(actionTypes.UPDATE_REQUESTED),
    );
  });

  test(`watchRemoveRequested ${metaTypes.userSettings}`, () => {
    const generator = sagas.watchRemoveRequested();
    const path = 'userSettings/user1';

    const action = actions.removeUserSettingsRequested('user1');
    const selector = sagas.getUserSettingsPath;

    expect(generator.next().value).toEqual(take(actionTypes.REMOVE_REQUESTED));
    expect(generator.next(action).value).toEqual(
      call(selector, action.payload),
    );
    expect(generator.next(path).value).toEqual(
      fork(sagas.removeItem, path, action.meta.type),
    );
  });

  test(`watchRemoveRequested ${metaTypes.chickens}`, () => {
    const generator = sagas.watchRemoveRequested();
    const path = 'chickens/flock1/chicken1';

    const action = actions.firebaseRemoveRequested(
      { flockId: 'flock1', chickenId: 'chicken1' },
      metaTypes.chickens,
    );
    const selector = sagas.getChickensPath;

    expect(generator.next().value).toEqual(take(actionTypes.REMOVE_REQUESTED));
    expect(generator.next(action).value).toEqual(
      call(selector, action.payload),
    );
    expect(generator.next(path).value).toEqual(
      fork(sagas.removeItem, path, action.meta.type),
    );
  });

  test('watchRemoveRequested unknownType', () => {
    const generator = sagas.watchRemoveRequested();

    // test non function case
    expect(generator.next().value).toEqual(take(actionTypes.REMOVE_REQUESTED));
    expect(generator.next({ meta: { type: 'unknownType' } }).value).toEqual(
      take(actionTypes.REMOVE_REQUESTED),
    );
  });

  test('watchAuthChanged', () => {
    const generator = cloneableGenerator(sagas.watchAuthChanged)();
    const chan = sagas.createAuthEventChannel();

    expect(generator.next().value).toEqual(call(sagas.createAuthEventChannel));
    expect(generator.next(chan).value).toEqual(take(chan));
    const loggedOutGenerator = generator.clone();

    // logged in flow
    const user = { uid: 'user1' };
    let event = { eventType: eventTypes.AUTH_STATUS_CHANGED, user };
    expect(generator.next(event).value).toEqual(
      put(actions.authStatusChanged(event.user)),
    );
    expect(generator.next().value).toEqual(
      put(actions.listenToUserSettings(event.user.uid)),
    );
    expect(generator.next().value).toEqual(take(chan));

    // logged out flow
    event = { eventType: eventTypes.AUTH_STATUS_CHANGED, user: null };
    expect(loggedOutGenerator.next(event).value).toEqual(
      put(actions.authStatusChanged(event.user)),
    );
    expect(loggedOutGenerator.next().value).toEqual(
      put(actions.firebaseRemoveAllListenersRequested()),
    );
    expect(loggedOutGenerator.next().value).toEqual(take(chan));
  });

  test('watchSignOutRequested', () => {
    const auth = firebase.auth();
    const generator = sagas.watchSignOutRequested();
    expect(generator.next().value).toEqual(
      take(actionTypes.SIGN_OUT_REQUESTED),
    );
    expect(generator.next().value).toEqual(
      all([
        put(actions.firebaseRemoveAllListenersRequested()),
        put({ type: actionTypes.CLEAR_FLOCKS }),
      ]),
    );
    expect(generator.next().value).toEqual(call([auth, auth.signOut]));
  });

  test('watchSignInRequested', () => {
    const auth = firebase.auth();
    const generator = cloneableGenerator(sagas.watchSignInRequested)();
    const action = actions.signInRequested('email', 'password');

    expect(generator.next().value).toEqual(take(actionTypes.SIGN_IN_REQUESTED));
    expect(generator.next(action).value).toEqual(
      call(
        [auth, auth.signInAndRetrieveDataWithEmailAndPassword],
        'email',
        'password',
      ),
    );
    const errorGenerator = generator.clone();
    expect(generator.next().value).toEqual(
      put({ type: actionTypes.SIGN_IN_FULFILLED }),
    );
    expect(generator.next().value).toEqual(take(actionTypes.SIGN_IN_REQUESTED));

    const error = new Error('some error signing in');
    expect(errorGenerator.throw(error).value).toEqual(
      put(actions.signInRejected(error)),
    );
    expect(errorGenerator.next().value).toEqual(
      take(actionTypes.SIGN_IN_REQUESTED),
    );
  });

  test('getUpdateAction CHILD_ADDED_EVENT', () => {
    const childAddedEvent = {
      eventType: eventTypes.CHILD_ADDED_EVENT,
      key: '1',
      data: 'Data from channel',
    };

    expect(
      sagas.getUpdateAction(childAddedEvent, metaTypes.userSettings),
    ).toEqual(
      actions.firebaseListenChildAdded(
        childAddedEvent.key,
        childAddedEvent.data,
        metaTypes.userSettings,
      ),
    );
  });

  test('getUpdateAction CHILD_CHANGED_EVENT', () => {
    const childChangedEvent = {
      eventType: eventTypes.CHILD_CHANGED_EVENT,
      key: '1',
      data: 'Data from channel',
    };

    expect(
      sagas.getUpdateAction(childChangedEvent, metaTypes.userSettings),
    ).toEqual(
      actions.firebaseListenChildChanged(
        childChangedEvent.key,
        childChangedEvent.data,
        metaTypes.userSettings,
      ),
    );
  });

  test('getUpdateAction CHILD_REMOVED_EVENT', () => {
    const childRemovedEvent = {
      eventType: eventTypes.CHILD_REMOVED_EVENT,
      key: '1',
    };

    expect(
      sagas.getUpdateAction(childRemovedEvent, metaTypes.userSettings),
    ).toEqual(
      actions.firebaseListenChildRemoved(
        childRemovedEvent.key,
        metaTypes.userSettings,
      ),
    );
  });

  test('getUpdateAction default case', () => {
    const childRemovedEvent = {
      eventType: 'UNKNOWN_TYPE',
      key: '1',
    };

    expect(
      sagas.getUpdateAction(childRemovedEvent, metaTypes.userSettings),
    ).toEqual({});
  });

  test('getDataAndListenToChannel', () => {
    const ref = firebase.database().ref();
    const chan = sagas.createEventChannel(ref);
    const metaType = metaTypes.offeringsCategories;
    const data = 'Data from database';
    const key = 'someKey';
    const snap = { key, val: () => data };

    const generator = cloneableGenerator(sagas.getDataAndListenToChannel)(
      ref,
      metaType,
    );
    expect(generator.next().value).toEqual(call(sagas.createEventChannel, ref));
    expect(generator.next(chan).value).toEqual(call([ref, ref.once], 'value'));

    const failureGenerator = generator.clone();

    // regular flow
    expect(generator.next(snap).value).toEqual(flush(chan));
    expect(generator.next().value).toEqual(
      put(actions.firebaseListenFulfilled(data, metaType)),
    );
    expect(generator.next().value).toEqual(take(chan));
    const childAddedAction = {
      eventType: eventTypes.CHILD_ADDED_EVENT,
      key: '1',
      data: 'Data from channel',
    };
    expect(generator.next(childAddedAction).value).toEqual(
      put(sagas.getUpdateAction(childAddedAction, metaType)),
    );
    expect(generator.next().value).toEqual(take(chan)); // return to listen to the channel
    generator.return(); // simulate cancellation

    // failure flow
    const error = new Error('An error occured');
    expect(failureGenerator.throw(error).value).toEqual(
      put(actions.firebaseListenRejected(error, metaType)),
    );
    expect(failureGenerator.next().value).toEqual(take(chan)); // listen to the channel
  });

  test('getDataAndListenToChannel null value', () => {
    const ref = firebase.database().ref();
    const chan = sagas.createEventChannel(ref);
    const metaType = metaTypes.offeringsCategories;
    const key = 'someKey';
    const snap = { key, val: () => null };

    const generator = cloneableGenerator(sagas.getDataAndListenToChannel)(
      ref,
      metaType,
    );
    expect(generator.next().value).toEqual(call(sagas.createEventChannel, ref));
    expect(generator.next(chan).value).toEqual(call([ref, ref.once], 'value'));

    // regular flow
    expect(generator.next(snap).value).toEqual(flush(chan));
    expect(generator.next().value).toEqual(
      put(actions.firebaseListenFulfilled({}, metaType)),
    );
    expect(generator.next().value).toEqual(take(chan));
    const childAddedAction = {
      eventType: eventTypes.CHILD_ADDED_EVENT,
      key: '1',
      data: 'Data from channel',
    };
    expect(generator.next(childAddedAction).value).toEqual(
      put(sagas.getUpdateAction(childAddedAction, metaType)),
    );
    expect(generator.next().value).toEqual(take(chan)); // return to listen to the channel
    generator.return(); // simulate cancellation
  });

  test('watchListener', () => {
    const checkedMetaType = metaTypes.userSettings;

    const generator = cloneableGenerator(sagas.watchListener)(checkedMetaType);

    expect(generator.next().value).toEqual(take(actionTypes.LISTEN_REQUESTED));

    const regularGenerator = generator.clone();
    const checkedListenRequestAction = actions.listenToUserSettings('userId1');
    const checkedListenRemoveAction = actions.removeUserSettingsListenerRequested();
    const unwantedListenRequestAction = actions.listenToChickens('flockId1');
    const unwantedListenRemoveAction = actions.removeUserSettingsListenerRequested();
    unwantedListenRemoveAction.meta.type = 'unknown';
    const { ref } = checkedListenRequestAction.payload;
    const mockTask = createMockTask();

    // regular flow
    const one = regularGenerator.next(checkedListenRequestAction);
    expect(one.value).toEqual(
      fork(
        sagas.getDataAndListenToChannel,
        ref,
        checkedListenRequestAction.meta.type,
      ),
    );
    const theTask = regularGenerator.next(mockTask).value;
    expect(theTask).toEqual(
      take([
        actionTypes.REMOVE_LISTENER_REQUESTED,
        actionTypes.LISTEN_REQUESTED,
        actionTypes.REMOVE_ALL_LISTENERS_REQUESTED,
      ]),
    );

    const regularWithUnwantedRemoveMetaType = regularGenerator.clone();
    const regularWithListenActionGenerator = regularGenerator.clone();

    expect(regularGenerator.next(checkedListenRemoveAction).value).toEqual(
      cancel(mockTask),
    );

    expect(regularGenerator.next().value).toEqual(
      put(
        actions.firebaseListenRemoved(
          checkedListenRemoveAction.payload.clearData,
          checkedMetaType,
        ),
      ),
    );
    // back to start
    expect(regularGenerator.next().value).toEqual(
      take(actionTypes.LISTEN_REQUESTED),
    );

    // unwanted listen request flow
    const unwantedListenRequestActionGenerator = generator.clone();
    expect(
      unwantedListenRequestActionGenerator.next(unwantedListenRequestAction)
        .value,
    ).toEqual(take(actionTypes.LISTEN_REQUESTED)); // unwatned action - go to start

    // unwanted remove request while waiting to specifig cancel request
    expect(
      regularWithUnwantedRemoveMetaType.next(unwantedListenRemoveAction).value,
    ).toEqual(
      take([
        actionTypes.REMOVE_LISTENER_REQUESTED,
        actionTypes.LISTEN_REQUESTED,
        actionTypes.REMOVE_ALL_LISTENERS_REQUESTED,
      ]),
    ); // contintue to wait

    // regualr with listen aciton
    expect(
      regularWithListenActionGenerator.next(checkedListenRequestAction).value,
    ).toEqual(cancel(mockTask));
    expect(regularWithListenActionGenerator.next().value).toEqual(
      put(actions.firebaseListenRemoved(false, checkedMetaType)),
    );
    expect(regularWithListenActionGenerator.next().value).toEqual(
      fork(
        sagas.getDataAndListenToChannel,
        checkedListenRequestAction.payload.ref,
        checkedMetaType,
      ),
    );

    expect(regularWithListenActionGenerator.next().value).toEqual(
      take([
        actionTypes.REMOVE_LISTENER_REQUESTED,
        actionTypes.LISTEN_REQUESTED,
        actionTypes.REMOVE_ALL_LISTENERS_REQUESTED,
      ]),
    ); // contintue to wait
  });

  test('getFlock', () => {
    const snapshot = {
      key: 'flockId1',
      val() {
        return {
          name: 'Flock Stars',
          ownedBy: 'userId1',
        };
      },
    };
    const action = actions.getFlock('flockId1');
    const generator = sagas.getFlock(action);
    expect(generator.next().value).toMatchSnapshot();
    expect(generator.next(snapshot)).toMatchSnapshot();
    expect(generator.next().done).toBeTruthy();
  });

  test('getFlock with Error', () => {
    const snapshotWithNoValFunction = {
      key: 'flockId1',
    };
    const action = actions.getFlock('flockId1');
    const generator = sagas.getFlock(action);
    generator.next();
    expect(generator.next(snapshotWithNoValFunction)).toMatchSnapshot();
    expect(generator.next().done).toBeTruthy();
  });

  test('watchGetFlock', () => {
    const generator = sagas.watchGetFlock();
    expect(generator.next().value).toMatchSnapshot();
  });

  test('joinFlock', () => {
    const userSettings = {
      currentFlockId: 'flock2',
      flocks: {
        flock2: true,
      },
    };

    const action = {
      type: actionTypes.JOIN_FLOCK_REQUESTED,
      payload: {
        userId: 'user1',
        flockId: 'flock1',
      },
    };
    const ref = firebase.database().ref(`flocks/${action.payload.flockId}`);
    const snapshot = {
      val() {
        return { name: 'Valid Flock' };
      },
    };

    const generator = cloneableGenerator(sagas.joinFlock)(action);
    expect(generator.next().value).toEqual(call([ref, ref.once]));
    const errorGenerator = generator.clone();

    // Happy path flow
    expect(JSON.stringify(generator.next(snapshot).value)).toEqual(
      JSON.stringify(select(state => state.userSettings.data)),
    );

    const expectedUserSettings = {
      currentFlockId: 'flock2',
      flocks: {
        flock1: true,
        flock2: true,
      },
    };
    expect(generator.next(userSettings).value).toEqual(
      put(
        actions.firebaseUpdateRequested(
          { userId: action.payload.userId, userSettings: expectedUserSettings },
          metaTypes.userSettings,
        ),
      ),
    );
    expect(generator.next().value).toEqual(
      put({ type: actionTypes.JOIN_FLOCK_FULFILLED }),
    );
    expect(generator.next().done).toEqual(true);

    // Error flow
    snapshot.val = () => null;
    expect(errorGenerator.next(snapshot).value).toEqual(
      put({
        type: actionTypes.JOIN_FLOCK_REJECTED,
        payload: new Error(`Flock ID '${action.payload.flockId}' not found`),
      }),
    );
    expect(generator.next().done).toEqual(true);
  });

  test('watchJoinFlockRequested', () => {
    const generator = sagas.watchJoinFlockRequested();
    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.JOIN_FLOCK_REQUESTED, sagas.joinFlock),
    );
  });

  test('addFlock', () => {
    const userSettings = {
      currentFlockId: 'flock1',
      flocks: {
        flock1: true,
      },
    };

    const action = {
      type: actionTypes.ADD_FLOCK_REQUESTED,
      payload: {
        userId: 'user1',
        name: 'Test Flock 1',
      },
    };
    const newRef = firebase.database().ref('flocks').push();

    const generator = cloneableGenerator(sagas.addFlock)(action);
    expect(JSON.stringify(generator.next().value)).toEqual(
      JSON.stringify(call([newRef, newRef.set], {
        name: action.payload.name,
        ownedBy: action.payload.userId,
      })),
    );
    const errorGenerator = generator.clone();

    // Happy path flow
    expect(JSON.stringify(generator.next().value)).toEqual(
      JSON.stringify(select(state => state.userSettings.data)),
    );

    const expectedUserSettings = {
      currentFlockId: 'flock1',
      flocks: {
        flock1: true,
        key1: true,
      },
    };
    expect(generator.next(userSettings).value).toEqual(
      put(
        actions.firebaseUpdateRequested(
          { userId: action.payload.userId, userSettings: expectedUserSettings },
          metaTypes.userSettings,
        ),
      ),
    );
    expect(generator.next().value).toEqual(
      put({ type: actionTypes.ADD_FLOCK_FULFILLED }),
    );
    expect(generator.next().done).toEqual(true);

    // Error flow
    expect(errorGenerator.throw(new Error('Error saving item')).value).toEqual(
      put({
        type: actionTypes.ADD_FLOCK_REJECTED,
        payload: new Error('Error saving item'),
      }),
    );
    expect(generator.next().done).toEqual(true);
  });

  test('watchAddFlockRequested', () => {
    const generator = sagas.watchAddFlockRequested();
    expect(generator.next().value).toEqual(
      takeLatest(actionTypes.ADD_FLOCK_REQUESTED, sagas.addFlock),
    );
  });

  test('root Saga', () => {
    const generator = sagas.default();
    expect(generator.next().value).toMatchSnapshot();
  });
});
