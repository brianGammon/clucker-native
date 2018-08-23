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
  race,
} from 'redux-saga/effects';
// eslint-disable-next-line
import ImageResizer from 'react-native-image-resizer';
import * as sagas from '../sagas';
import * as actions from '../actions';
import NavigationService from '../../navigation/NavigationService';
import { metaTypes, eventTypes, actionTypes as a } from '../constants';
import eggsByChickenSelector from '../../selectors/eggsByChickenSelector';

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
    expect(generator.next().value).toEqual(take(a.CREATE_REQUESTED));
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
    expect(generator.next().value).toEqual(take(a.CREATE_REQUESTED));
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
    expect(generator.next().value).toEqual(take(a.CREATE_REQUESTED));
    expect(generator.next({ meta: { type: 'unknownType' } }).value).toEqual(
      take(a.CREATE_REQUESTED),
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
    expect(generator.next().value).toEqual(take(a.UPDATE_REQUESTED));
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
    expect(generator.next().value).toEqual(take(a.UPDATE_REQUESTED));
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
    expect(generator.next().value).toEqual(take(a.UPDATE_REQUESTED));
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
    expect(generator.next().value).toEqual(take(a.UPDATE_REQUESTED));
    expect(generator.next({ meta: { type: 'unknownType' } }).value).toEqual(
      take(a.UPDATE_REQUESTED),
    );
  });

  test(`watchRemoveRequested ${metaTypes.userSettings}`, () => {
    const generator = sagas.watchRemoveRequested();
    const path = 'userSettings/user1';

    const action = actions.removeUserSettingsRequested('user1');
    const selector = sagas.getUserSettingsPath;

    expect(generator.next().value).toEqual(take(a.REMOVE_REQUESTED));
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

    expect(generator.next().value).toEqual(take(a.REMOVE_REQUESTED));
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
    expect(generator.next().value).toEqual(take(a.REMOVE_REQUESTED));
    expect(generator.next({ meta: { type: 'unknownType' } }).value).toEqual(
      take(a.REMOVE_REQUESTED),
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
    expect(generator.next().value).toEqual(
      call([NavigationService, NavigationService.navigate], 'SignedIn'),
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
      take(a.SIGN_OUT_REQUESTED),
    );
    expect(generator.next().value).toEqual(
      all([
        put(actions.firebaseRemoveAllListenersRequested()),
        put({ type: a.CLEAR_ALL_FLOCKS }),
      ]),
    );
    expect(generator.next().value).toEqual(call([auth, auth.signOut]));
  });

  test('performAuthAction for signIn type', () => {
    const auth = firebase.auth();
    const action = actions.signInRequested('email', 'password');
    const generator = cloneableGenerator(sagas.performAuthAction)(action);

    expect(generator.next().value).toEqual(
      call(
        [auth, auth.signInAndRetrieveDataWithEmailAndPassword], ...action.payload,
      ),
    );

    // Save for later
    const errorGenerator = generator.clone();

    expect(generator.next().value).toEqual(
      put({ type: a.AUTH_ACTION_FULFILLED, meta: { type: action.meta.type } }),
    );
    expect(generator.next().done).toEqual(true);

    const error = new Error('some error signing in');
    expect(errorGenerator.throw(error).value).toEqual(
      put({ type: a.AUTH_ACTION_REJECTED, payload: { error }, meta: { type: action.meta.type } }),
    );
    expect(generator.next().done).toEqual(true);
  });

  test('performAuthAction for signUp type', () => {
    const auth = firebase.auth();
    const action = actions.signUpRequested('email', 'password');
    const generator = sagas.performAuthAction(action);

    expect(generator.next().value).toEqual(
      call(
        [auth, auth.createUserAndRetrieveDataWithEmailAndPassword], ...action.payload,
      ),
    );

    expect(generator.next().value).toEqual(
      put({ type: a.AUTH_ACTION_FULFILLED, meta: { type: action.meta.type } }),
    );
    expect(generator.next().done).toEqual(true);
  });

  test('performAuthAction for resetPassword type', () => {
    const auth = firebase.auth();
    const action = actions.resetPasswordRequested('email');
    const generator = sagas.performAuthAction(action);

    expect(generator.next().value).toEqual(
      call(
        [auth, auth.sendPasswordResetEmail], ...action.payload,
      ),
    );

    expect(generator.next().value).toEqual(
      put({ type: a.AUTH_ACTION_FULFILLED, meta: { type: action.meta.type } }),
    );
    expect(generator.next().done).toEqual(true);
  });

  test('watchAuthActionRequested', () => {
    const generator = sagas.watchAuthActionRequested();
    expect(generator.next().value).toEqual(takeLatest(a.AUTH_ACTION_REQUESTED, sagas.performAuthAction));
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

    expect(generator.next().value).toEqual(take(a.LISTEN_REQUESTED));

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
        a.REMOVE_LISTENER_REQUESTED,
        a.LISTEN_REQUESTED,
        a.REMOVE_ALL_LISTENERS_REQUESTED,
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
      take(a.LISTEN_REQUESTED),
    );

    // unwanted listen request flow
    const unwantedListenRequestActionGenerator = generator.clone();
    expect(
      unwantedListenRequestActionGenerator.next(unwantedListenRequestAction)
        .value,
    ).toEqual(take(a.LISTEN_REQUESTED)); // unwatned action - go to start

    // unwanted remove request while waiting to specifig cancel request
    expect(
      regularWithUnwantedRemoveMetaType.next(unwantedListenRemoveAction).value,
    ).toEqual(
      take([
        a.REMOVE_LISTENER_REQUESTED,
        a.LISTEN_REQUESTED,
        a.REMOVE_ALL_LISTENERS_REQUESTED,
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
        a.REMOVE_LISTENER_REQUESTED,
        a.LISTEN_REQUESTED,
        a.REMOVE_ALL_LISTENERS_REQUESTED,
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
      type: a.JOIN_FLOCK_REQUESTED,
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
      currentFlockId: 'flock1',
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
      put({ type: a.JOIN_FLOCK_FULFILLED }),
    );
    expect(generator.next().done).toEqual(true);

    // Error flow
    snapshot.val = () => null;
    const error = new Error(`Flock ID '${action.payload.flockId}' not found`);
    expect(errorGenerator.next(snapshot).value).toEqual(
      put({
        type: a.JOIN_FLOCK_REJECTED,
        payload: { error },
      }),
    );
    expect(generator.next().done).toEqual(true);
  });

  test('watchJoinFlockRequested', () => {
    const generator = sagas.watchJoinFlockRequested();
    expect(generator.next().value).toEqual(
      takeLatest(a.JOIN_FLOCK_REQUESTED, sagas.joinFlock),
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
      type: a.ADD_FLOCK_REQUESTED,
      payload: {
        userId: 'user1',
        name: 'Test Flock 1',
      },
    };
    const newRef = firebase
      .database()
      .ref('flocks')
      .push();

    const generator = cloneableGenerator(sagas.addFlock)(action);
    expect(JSON.stringify(generator.next().value)).toEqual(
      JSON.stringify(
        call([newRef, newRef.set], {
          name: action.payload.name,
          ownedBy: action.payload.userId,
        }),
      ),
    );
    const errorGenerator = generator.clone();

    // Happy path flow
    expect(JSON.stringify(generator.next().value)).toEqual(
      JSON.stringify(select(state => state.userSettings.data)),
    );

    const expectedUserSettings = {
      currentFlockId: 'key1',
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
      put({ type: a.ADD_FLOCK_FULFILLED }),
    );
    expect(generator.next().done).toEqual(true);

    // Error flow
    expect(errorGenerator.throw(new Error('Error saving item')).value).toEqual(
      put({
        type: a.ADD_FLOCK_REJECTED,
        payload: { error: new Error('Error saving item') },
      }),
    );
    expect(generator.next().done).toEqual(true);
  });

  test('watchAddFlockRequested', () => {
    const generator = sagas.watchAddFlockRequested();
    expect(generator.next().value).toEqual(
      takeLatest(a.ADD_FLOCK_REQUESTED, sagas.addFlock),
    );
  });

  test('unlinkFlock when flock is selected', () => {
    const userId = 'user1';
    const userSettings = {
      currentFlockId: 'flock1',
      flocks: {
        flock1: true,
        flock2: true,
      },
    };
    const flockId = 'flock1';
    const action = {
      type: a.UNLINK_FLOCK_REQUESTED,
      payload: { userId, userSettings, flockId },
    };
    const generator = sagas.unlinkFlock(action);
    expect(generator.next().value).toEqual(
      all([
        put(actions.firebaseListenRemoved(true, metaTypes.chickens)),
        put(actions.firebaseListenRemoved(true, metaTypes.eggs)),
      ]),
    );
    const expectedUserSettings = {
      currentFlockId: null,
      flocks: {
        flock2: true,
      },
    };
    expect(generator.next().value).toEqual(
      put(
        actions.firebaseUpdateRequested(
          { userId, userSettings: expectedUserSettings },
          metaTypes.userSettings,
        ),
      ),
    );
    expect(generator.next().value).toEqual(put({ type: a.UNLINK_FLOCK_FULFILLED, resetStack: true }));
    expect(generator.next().done).toEqual(true);
  });

  test('unlinkFlock when flock not selected', () => {
    const userId = 'user1';
    const userSettings = {
      currentFlockId: 'flock1',
      flocks: {
        flock1: true,
        flock2: true,
      },
    };
    const flockId = 'flock2';
    const action = {
      type: a.UNLINK_FLOCK_REQUESTED,
      payload: { userId, userSettings, flockId },
    };
    const generator = sagas.unlinkFlock(action);
    const expectedUserSettings = {
      currentFlockId: 'flock1',
      flocks: {
        flock1: true,
      },
    };
    expect(generator.next().value).toEqual(
      put(
        actions.firebaseUpdateRequested(
          { userId, userSettings: expectedUserSettings },
          metaTypes.userSettings,
        ),
      ),
    );
    expect(generator.next().value).toEqual(put({ type: a.UNLINK_FLOCK_FULFILLED, resetStack: false }));
    expect(generator.next().done).toEqual(true);
  });

  test('watchUnlinkFlockRequested', () => {
    const generator = sagas.watchUnlinkFlockRequested();
    expect(generator.next().value).toEqual(
      takeLatest(a.UNLINK_FLOCK_REQUESTED, sagas.unlinkFlock),
    );
  });

  describe('deleteFlocks', () => {
    const userId = 'user1';
    const userSettings = {
      currentFlockId: 'flock1',
      flocks: {
        flock1: true,
        flock2: true,
      },
    };
    const flockId = 'flock1';
    const action = {
      type: a.DELETE_FLOCK_REQUESTED,
      payload: { userId, userSettings, flockId },
    };

    const baseRef = firebase.database().ref();
    const userSettingsRef = baseRef.child('userSettings');
    const queryRef = userSettingsRef
      .orderByChild('flocks/flock1')
      .equalTo(true);

    const snapshot1 = {
      key: 'user1',
      val() {
        return {
          currentFlockId: 'flock1',
          flocks: {
            flock1: true,
            flock2: true,
          },
        };
      },
    };

    // Part of the deleted flock, but different flock active
    const snapshot2 = {
      key: 'user2',
      val() {
        return {
          currentFlockId: 'flock2',
          flocks: {
            flock1: true,
            flock2: true,
          },
        };
      },
    };

    // Has no current flock, but is part of the deleted flock
    const snapshot3 = {
      key: 'user3',
      val() {
        return {
          flocks: {
            flock1: true,
            flock2: true,
          },
        };
      },
    };

    const snapshot = {
      forEach(cb) {
        [snapshot1, snapshot2, snapshot3].forEach(child => cb(child));
      },
    };

    const updates = {
      'user1/currentFlockId': null,
      'user1/flocks/flock1': null,
      'user2/flocks/flock1': null,
      'user3/flocks/flock1': null,
    };

    test('deleteFlock when currently selected', () => {
      const generator = cloneableGenerator(sagas.deleteFlock)(action);
      expect(generator.next().value).toEqual(
        all([
          put(actions.firebaseListenRemoved(true, metaTypes.chickens)),
          put(actions.firebaseListenRemoved(true, metaTypes.eggs)),
        ]),
      );

      expect(generator.next().value).toEqual(
        call([queryRef, queryRef.once], 'value'),
      );

      // Save for later
      const errorGenerator = generator.clone();

      expect(generator.next(snapshot).value).toEqual(
        call([userSettingsRef, userSettingsRef.update], updates),
      );
      let removalRef = baseRef.child('eggs/flock1');
      expect(generator.next().value).toEqual(
        call([removalRef, removalRef.remove]),
      );

      removalRef = baseRef.child('chickens/flock1');
      expect(generator.next().value).toEqual(
        call([removalRef, removalRef.remove]),
      );

      removalRef = baseRef.child('flocks/flock1');
      expect(generator.next().value).toEqual(
        call([removalRef, removalRef.remove]),
      );

      const deletedFlocksRef = baseRef.child('deletedFlocks/user1/flock1');
      expect(generator.next().value).toEqual(
        call([deletedFlocksRef, deletedFlocksRef.set], true),
      );

      expect(generator.next().value).toEqual(put({ type: a.DELETE_FLOCK_FULFILLED, resetStack: true }));
      expect(generator.next().done).toEqual(true);

      // Error path
      const error = new Error('An error occured');
      expect(errorGenerator.throw(error).value).toEqual(
        put({ type: a.DELETE_FLOCK_REJECTED, payload: { error } }),
      );
    });

    test('deleteFlock when not the currently selected flock', () => {
      // When no current flock is set at all
      const { currentFlockId, ...rest } = userSettings;
      const action2 = {
        type: a.DELETE_FLOCK_REQUESTED,
        payload: { userId, userSettings: rest, flockId },
      };

      const generator = sagas.deleteFlock(action2);

      expect(generator.next().value).toEqual(
        call([queryRef, queryRef.once], 'value'),
      );

      expect(generator.next(snapshot).value).toEqual(
        call([userSettingsRef, userSettingsRef.update], updates),
      );
      let removalRef = baseRef.child('eggs/flock1');
      expect(generator.next().value).toEqual(
        call([removalRef, removalRef.remove]),
      );

      removalRef = baseRef.child('chickens/flock1');
      expect(generator.next().value).toEqual(
        call([removalRef, removalRef.remove]),
      );

      removalRef = baseRef.child('flocks/flock1');
      expect(generator.next().value).toEqual(
        call([removalRef, removalRef.remove]),
      );

      const deletedFlocksRef = baseRef.child('deletedFlocks/user1/flock1');
      expect(generator.next().value).toEqual(
        call([deletedFlocksRef, deletedFlocksRef.set], true),
      );

      expect(generator.next().value).toEqual(put({ type: a.DELETE_FLOCK_FULFILLED, resetStack: false }));
      expect(generator.next().done).toEqual(true);
    });
  });

  test('watchDeleteFlockRequested', () => {
    const generator = sagas.watchDeleteFlockRequested();
    expect(generator.next().value).toEqual(
      takeLatest(a.DELETE_FLOCK_REQUESTED, sagas.deleteFlock),
    );
  });

  test('deleteFromStorage', () => {
    const paths = ['path1', 'path2'];
    const ref = firebase.storage().ref();
    const path1Ref = ref.child('path1');
    const path2Ref = ref.child('path2');
    const generator = sagas.deleteFromStorage(paths);
    expect(generator.next().value).toEqual(put({ type: a.STORAGE_DELETE_REQUESTED }));
    expect(generator.next().value).toEqual(all([
      call([path1Ref, path1Ref.delete]),
      call([path2Ref, path2Ref.delete]),
    ]));
    expect(generator.next().value).toEqual(put({ type: a.STORAGE_DELETE_FULFILLED }));
  });

  test('deleteFromStorage with errors', () => {
    const paths = ['path1', 'path2'];
    const ref = firebase.storage().ref();
    const path1Ref = ref.child('path1');
    const path2Ref = ref.child('path2');
    const generator = cloneableGenerator(sagas.deleteFromStorage)(paths);
    expect(generator.next().value).toEqual(put({ type: a.STORAGE_DELETE_REQUESTED }));
    expect(generator.next().value).toEqual(all([
      call([path1Ref, path1Ref.delete]),
      call([path2Ref, path2Ref.delete]),
    ]));
    const otherCaseGenerator = generator.clone();
    const error = new Error('Storage Error.');
    expect(generator.throw(error).value).toEqual(put({ type: a.STORAGE_DELETE_REJECTED, payload: { error } }));

    const notFoundError = new Error('Not Found Error');
    notFoundError.code = 'storage/object-not-found';
    expect(otherCaseGenerator.throw(notFoundError).value).toEqual(put({ type: a.STORAGE_DELETE_FULFILLED }));
  });

  test('addToStorage', () => {
    const userId = 'user1';
    const flockId = 'flock1';
    const image = {
      path: 'tmp/path1',
      width: 480,
      height: 480,
    };
    const resizedImage = {
      path: 'tmp/thumbPath1',
    };
    const ref = firebase.storage().ref();
    const photoRef = ref.child(`uploads/user:${userId}/flock:${flockId}/123456789-480x480`);
    const thumbRef = ref.child(`uploads/user:${userId}/flock:${flockId}/123456789-128x128`);
    const generator = cloneableGenerator(sagas.addToStorage)(userId, flockId, image);
    expect(generator.next().value).toEqual(put({ type: a.STORAGE_UPLOAD_REQUESTED }));
    expect(generator.next().value).toEqual(call(
      [ImageResizer, ImageResizer.createResizedImage],
      image.path,
      128,
      128,
      'JPEG',
      100,
      0,
    ));
    expect(generator.next(resizedImage).value).toEqual(all([
      call([photoRef, photoRef.putFile], 'tmp/path1'),
      call([thumbRef, thumbRef.putFile], 'tmp/thumbPath1'),
    ]));
    const errorGenerator = generator.clone();
    const results = [
      { downloadUrl: 'http://test.example.com/1', ref: 'path3' },
      { downloadUrl: 'http://test.example.com/2', ref: 'path4' },
    ];
    expect(generator.next(results).value).toEqual(put({ type: a.STORAGE_UPLOAD_FULFILLED, payload: results }));
    expect(generator.next().done).toEqual(true);

    // Error flow
    const error = new Error('Upload error occurred.');
    expect(errorGenerator.throw(error).value).toEqual(put({ type: a.STORAGE_UPLOAD_REJECTED, payload: { error } }));
    expect(generator.next().done).toEqual(true);
  });

  test('deleteChicken', () => {
    const action = {
      type: a.DELETE_CHICKEN_REQUESTED,
      payload: {
        chickenId: 'chicken1',
        flockId: 'flock1',
        paths: ['path1', 'path2'],
      },
    };
    const eggs = {
      egg1: true,
      egg2: true,
      egg3: true,
    };
    const generator = cloneableGenerator(sagas.deleteChicken)(action);
    const ref = firebase.database().ref();
    const eggsRef = ref.child('/eggs/flock1');
    const updates = {
      egg1: null,
      egg2: null,
      egg3: null,
    };
    expect(generator.next().value).toEqual(fork(sagas.deleteFromStorage, action.payload.paths));
    const task = createMockTask();
    expect(generator.next(task).value).toEqual(
      race({
        successResult: take(a.STORAGE_DELETE_FULFILLED),
        errorResult: take(a.STORAGE_DELETE_REJECTED),
      }),
    );
    const errorGenerator = generator.clone();
    const result = {
      successResult: { type: a.STORAGE_DELETE_FULFILLED },
    };
    expect(JSON.stringify(generator.next(result).value)).toEqual(JSON.stringify(select(state => eggsByChickenSelector(state.eggs.data, action.payload.chickenId))));
    expect(generator.next(eggs).value).toEqual(
      call([eggsRef, eggsRef.update], updates),
    );

    const chickensRef = ref.child('/chickens/flock1/chicken1');
    expect(generator.next().value).toEqual(call([chickensRef, chickensRef.remove]));
    expect(generator.next().value).toEqual(put({ type: a.DELETE_CHICKEN_FULFILLED }));
    expect(generator.next().done).toEqual(true);

    // error flow
    const error = new Error('A storage error has occurred');
    result.errorResult = { type: a.STORAGE_DELETE_REJECTED, payload: { error } };
    expect(errorGenerator.next(result).value).toEqual(cancel(task));
    expect(errorGenerator.throw(error).value).toEqual(put({ type: a.DELETE_CHICKEN_REJECTED, payload: { error } }));
  });

  test('watchDeleteChickenRequested', () => {
    const generator = sagas.watchDeleteChickenRequested();
    expect(generator.next().value).toEqual(takeLatest(a.DELETE_CHICKEN_REQUESTED, sagas.deleteChicken));
  });

  test('resetNavigation with resetStack = true', () => {
    const action = { type: a.DELETE_FLOCK_FULFILLED, resetStack: true };
    const generator = sagas.resetNavigation(action);
    expect(generator.next().value).toEqual(call([NavigationService, NavigationService.resetTabs]));
  });

  test('resetNavigation with resetStack = false', () => {
    const action = { type: a.DELETE_FLOCK_FULFILLED, resetStack: false };
    const generator = sagas.resetNavigation(action);
    expect(generator.next().done).toEqual(true);
  });

  test('watchFlockActionsComplete', () => {
    const generator = sagas.watchFlockActionsComplete();
    expect(generator.next().value).toEqual(takeLatest([a.DELETE_FLOCK_FULFILLED, a.UNLINK_FLOCK_FULFILLED], sagas.resetNavigation));
  });

  test('saveChicken - update, remove photo, new photo', () => {
    const action = {
      type: a.SAVE_CHICKEN_REQUESTED,
      payload: {
        flockId: 'flock1',
        chickenId: 'chicken1',
        data: {
          name: 'Test',
          photoPath: '',
          thumbnailPath: '',
        },
        newImage: {
          path: 'tmp/path3',
          width: 480,
          height: 480,
        },
        userId: 'user1',
      },
    };
    const generator = cloneableGenerator(sagas.saveChicken)(action);
    const prevChickenState = {
      name: 'Test',
      photoPath: 'path1',
      thumbnailPath: 'path2',
    };
    expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(select(state => state.chickens.data[action.payload.chickenId])));
    expect(generator.next(prevChickenState).value).toEqual(fork(sagas.deleteFromStorage, [prevChickenState.photoPath, prevChickenState.thumbnailPath]));
    const task = createMockTask();
    expect(generator.next(task).value).toEqual(race({
      successResult: take(a.STORAGE_DELETE_FULFILLED),
      errorResult: take(a.STORAGE_DELETE_REJECTED),
    }));
    const deleteErrorGenerator = generator.clone();
    const result = {
      successResult: { type: a.STORAGE_DELETE_FULFILLED },
    };
    expect(generator.next(result).value).toEqual(fork(sagas.addToStorage, action.payload.userId, action.payload.flockId, action.payload.newImage));

    expect(generator.next(task).value).toEqual(race({
      successResult: take(a.STORAGE_UPLOAD_FULFILLED),
      errorResult: take(a.STORAGE_UPLOAD_REJECTED),
    }));
    const uploadErrorGenerator = generator.clone();
    result.successResult = {
      type: a.STORAGE_UPLOAD_FULFILLED,
      payload: [
        { downloadURL: 'http://test.example.com/1', ref: 'path3' },
        { downloadURL: 'http://test.example.com/2', ref: 'path4' },
      ],
    };
    expect(generator.next(result).value).toEqual(put(actions.firebaseUpdateRequested({ flockId: action.payload.flockId, chickenId: action.payload.chickenId, data: action.payload.data }, metaTypes.chickens)));

    expect(generator.next().done).toEqual(true);

    // storage delete error flow
    const error = new Error('A storage error has occurred');
    result.errorResult = { type: a.STORAGE_DELETE_REJECTED, payload: { error } };
    expect(deleteErrorGenerator.next(result).value).toEqual(cancel(task));
    expect(deleteErrorGenerator.throw(error).value).toEqual(put(actions.firebaseUpdateRejected(error, metaTypes.chickens)));
    expect(deleteErrorGenerator.next().done).toEqual(true);

    // storage upload error flow
    const error2 = new Error('A storage error has occurred');
    result.errorResult = { type: a.STORAGE_UPLOAD_REJECTED, payload: { error2 } };
    expect(uploadErrorGenerator.next(result).value).toEqual(cancel(task));
    expect(uploadErrorGenerator.throw(error).value).toEqual(put(actions.firebaseUpdateRejected(error, metaTypes.chickens)));
    expect(uploadErrorGenerator.next().done).toEqual(true);
  });

  test('saveChicken - update, no prev photo, new photo', () => {
    const action = {
      type: a.SAVE_CHICKEN_REQUESTED,
      payload: {
        flockId: 'flock1',
        chickenId: 'chicken1',
        data: {
          name: 'Test',
          photoPath: '',
          thumbnailPath: '',
        },
        newImage: 'image1',
        userId: 'user1',
      },
    };
    const generator = sagas.saveChicken(action);
    const prevChickenState = {
      name: 'Test',
      photoPath: '',
      thumbnailPath: '',
    };
    const task = createMockTask();
    expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(select(state => state.chickens.data[action.payload.chickenId])));
    expect(generator.next(prevChickenState).value).toEqual(fork(sagas.addToStorage, action.payload.userId, action.payload.flockId, action.payload.newImage));
    expect(generator.next(task).value).toEqual(race({
      successResult: take(a.STORAGE_UPLOAD_FULFILLED),
      errorResult: take(a.STORAGE_UPLOAD_REJECTED),
    }));
    const result = {
      successResult: {
        type: a.STORAGE_UPLOAD_FULFILLED,
        payload: [
          { downloadUrl: 'http://test.example.com/1', ref: 'path3' },
          { downloadUrl: 'http://test.example.com/2', ref: 'path4' },
        ],
      },
    };
    expect(generator.next(result).value).toEqual(put(actions.firebaseUpdateRequested({ flockId: action.payload.flockId, chickenId: action.payload.chickenId, data: action.payload.data }, metaTypes.chickens)));
    expect(generator.next().done).toEqual(true);
  });

  test('saveChicken - create, new photo', () => {
    const action = {
      type: a.SAVE_CHICKEN_REQUESTED,
      payload: {
        flockId: 'flock1',
        data: {
          name: 'Test',
          photoPath: '',
          thumbnailPath: '',
        },
        newImage: 'image1',
        userId: 'user1',
      },
    };
    const generator = sagas.saveChicken(action);
    const prevChickenState = null;
    const task = createMockTask();
    expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(select(state => state.chickens.data[action.payload.chickenId])));
    expect(generator.next(prevChickenState).value).toEqual(fork(sagas.addToStorage, action.payload.userId, action.payload.flockId, action.payload.newImage));

    expect(generator.next(task).value).toEqual(race({
      successResult: take(a.STORAGE_UPLOAD_FULFILLED),
      errorResult: take(a.STORAGE_UPLOAD_REJECTED),
    }));
    const result = {
      successResult: {
        type: a.STORAGE_UPLOAD_FULFILLED,
        payload: [
          { downloadUrl: 'http://test.example.com/1', ref: 'path3' },
          { downloadUrl: 'http://test.example.com/2', ref: 'path4' },
        ],
      },
    };
    expect(generator.next(result).value).toEqual(put(actions.firebaseCreateRequested({ flockId: action.payload.flockId, chickenId: action.payload.chickenId, data: action.payload.data }, metaTypes.chickens)));
    expect(generator.next().done).toEqual(true);
  });

  test('saveChicken - create, no photo', () => {
    const action = {
      type: a.SAVE_CHICKEN_REQUESTED,
      payload: {
        flockId: 'flock1',
        data: {
          name: 'Test',
          photoPath: '',
          thumbnailPath: '',
        },
      },
    };
    const generator = sagas.saveChicken(action);
    const prevChickenState = null;
    expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(select(state => state.chickens.data[action.payload.chickenId])));
    expect(generator.next(prevChickenState).value).toEqual(put(actions.firebaseCreateRequested({ flockId: action.payload.flockId, chickenId: action.payload.chickenId, data: action.payload.data }, metaTypes.chickens)));
    expect(generator.next().done).toEqual(true);
  });

  test('watchSaveChickenRequested', () => {
    const generator = sagas.watchSaveChickenRequested();
    expect(generator.next().value).toEqual(takeLatest(a.SAVE_CHICKEN_REQUESTED, sagas.saveChicken));
  });

  test('root Saga', () => {
    const generator = sagas.default();
    expect(generator.next().value).toMatchSnapshot();
  });
});
