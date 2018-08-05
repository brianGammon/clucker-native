import firebase from 'react-native-firebase';
import { cloneableGenerator, createMockTask } from 'redux-saga/utils';
import {
  put,
  take,
  call,
  fork,
  cancel,
  flush,
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
      uid: 'userId1',
      displayName: 'Test User',
      currentFlockId: 'flockId1',
      flocks: { flockId1: true },
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
      updatedChicken: {
        name: 'Test Chicken',
        breed: 'Some Breed',
        hatched: '2018-10-06',
      },
    };

    expect(sagas.getChickensUpdate(updates)).toMatchSnapshot();
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
      uid: 'bgammon',
      displayName: 'Brian',
      currentFlockId: 'flockId1',
      flocks: { flockId1: true },
    };
    const expectedUpdates = {
      'userSettings/bgammon/currentFlockId': payload.currentFlockId,
      'userSettings/bgammon/displayName': payload.displayName,
      'userSettings/bgammon/flocks': payload.flocks,
    };
    const action = actions.updateUserSettingsRequested(
      payload.uid,
      payload.displayName,
      payload.currentFlockId,
      payload.flocks,
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
      updatedChicken: {
        name: 'Test Chicken',
        breed: 'Some Breed',
        hatched: '2018-10-06',
      },
    };
    const expectedUpdates = {
      'chickens/flock1/chicken1': payload.updatedChicken,
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
      put(actions.firebaseListenFulfilled({ key, data }, metaType)),
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
      put(actions.firebaseListenFulfilled({ key, data: {} }, metaType)),
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

  test('root Saga', () => {
    const generator = sagas.default();
    expect(generator.next().value).toMatchSnapshot();
  });
});
