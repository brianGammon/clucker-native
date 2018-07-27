import firebase from 'react-native-firebase';
import { cloneableGenerator, createMockTask } from 'redux-saga/utils';
import {
  put, take, call, fork, cancel, flush,
} from 'redux-saga/effects';
import * as sagas from '../sagas';
import * as actions from '../actions';
import { metaTypes, eventTypes, actionTypes } from '../constants';

describe('database saga', () => {
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
    const selector = sagas.getUserSettingsUpdates;

    const result = selector(payload);
    expect(generator.next().value).toEqual(take(actionTypes.UPDATE_REQUESTED));
    expect(generator.next(action).value).toEqual(call(selector, action.payload));
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

  test(`watchRemoveRequested ${metaTypes.userContacts}`, () => {
    const generator = sagas.watchRemoveRequested();
    const path = 'a/b/c';

    const action = actions.removeUserSettingsRequested();
    const selector = sagas.getUserSettingsPath;

    expect(generator.next().value).toEqual(take(actionTypes.REMOVE_REQUESTED));
    expect(generator.next(action).value).toEqual(call(selector, action.payload));
    expect(generator.next(path).value).toEqual(fork(sagas.removeItem, path, action.meta.type));
    // expect(generator.next({ meta: { type: 'unknownType' } }).value).toEqual(
    //   take(actionTypes.REMOVE_REQUESTED),
    // );
  });

  test('watchRemoveRequested unknownType', () => {
    const generator = sagas.watchRemoveRequested();

    // test non function case
    expect(generator.next().value).toEqual(take(actionTypes.REMOVE_REQUESTED));
    expect(generator.next({ meta: { type: 'unknownType' } }).value).toEqual(
      take(actionTypes.REMOVE_REQUESTED),
    );
  });

  test('watchListener', () => {
    const checkedMetaType = metaTypes.userSettings;

    const generator = cloneableGenerator(sagas.watchListener)(checkedMetaType);

    expect(generator.next().value).toEqual(take(actionTypes.LISTEN_REQUESTED));

    const regularGenerator = generator.clone();
    const checkedListenRequestAction = actions.listenToUserSettings('userId1');
    const checkedListenRemoveAction = actions.removeUserSettingsListenerRequested();
    const unwantedListenRequestAction = actions.listenToChickens('flockId1');
    // const unwantedListenRemoveAction = actions.removeUserSettingsListenerRequested();
    const { ref } = checkedListenRequestAction.payload;
    const mockTask = createMockTask();

    // regular flow
    const one = regularGenerator.next(checkedListenRequestAction);
    expect(one.value).toEqual(
      fork(sagas.getDataAndListenToChannel, ref, checkedListenRequestAction.meta.type),
    );
    const theTask = regularGenerator.next(mockTask).value;
    expect(theTask).toEqual(
      take([
        actionTypes.REMOVE_LISTENER_REQUESTED,
        actionTypes.LISTEN_REQUESTED,
        actionTypes.REMOVE_ALL_LISTENERS_REQUESTED,
      ]),
    );

    // const regularWithUnwantedRemoveMetaType = regularGenerator.clone();
    const regularWithListenActionGenerator = regularGenerator.clone();

    expect(regularGenerator.next(checkedListenRemoveAction).value).toEqual(cancel(mockTask));

    expect(regularGenerator.next().value).toEqual(
      put(
        actions.firebaseListenRemoved(
          checkedListenRemoveAction.payload.clearItems,
          checkedMetaType,
        ),
      ),
    );
    // back to start
    expect(regularGenerator.next().value).toEqual(take(actionTypes.LISTEN_REQUESTED));

    // unwanted listen request flow
    const unwantedListenRequestActionGenerator = generator.clone();
    expect(unwantedListenRequestActionGenerator.next(unwantedListenRequestAction).value).toEqual(
      take(actionTypes.LISTEN_REQUESTED),
    ); // unwatned action - go to start

    // unwanted remove request while waiting to specifig cancel request
    // expect(regularWithUnwantedRemoveMetaType.next(unwantedListenRemoveAction).value).toEqual(
    //   take([
    //     actionTypes.REMOVE_LISTENER_REQUESTED,
    //     actionTypes.LISTEN_REQUESTED,
    //     actionTypes.REMOVE_ALL_LISTENERS_REQUESTED,
    //   ]),
    // ); // contintue to wait

    // regualr with listen aciton
    expect(regularWithListenActionGenerator.next(checkedListenRequestAction).value).toEqual(
      cancel(mockTask),
    );
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

  test('getDataAndListenToChannel', () => {
    const ref = firebase.database().ref();
    const chan = sagas.createEventChannel(ref);
    const metaType = metaTypes.offeringsCategories;
    const value = 'Data from database';
    const snap = { val: () => value };

    const generator = cloneableGenerator(sagas.getDataAndListenToChannel)(ref, metaType);
    expect(generator.next().value).toEqual(call(sagas.createEventChannel, ref));
    expect(generator.next(chan).value).toEqual(call([ref, ref.once], 'value'));

    const failureGenerator = generator.clone();

    // regular flow
    expect(generator.next(snap).value).toEqual(flush(chan));
    expect(generator.next().value).toEqual(put(actions.firebaseListenFulfilled(value, metaType)));
    expect(generator.next().value).toEqual(take(chan));
    const data = {
      eventType: eventTypes.CHILD_ADDED,
      key: '1',
      value: 'Data from channel',
    };
    expect(generator.next(data).value).toEqual(put(sagas.getUpdateAction(data, metaType)));
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
    const snap = { val: () => null };

    const generator = cloneableGenerator(sagas.getDataAndListenToChannel)(ref, metaType);
    expect(generator.next().value).toEqual(call(sagas.createEventChannel, ref));
    expect(generator.next(chan).value).toEqual(call([ref, ref.once], 'value'));

    // regular flow
    expect(generator.next(snap).value).toEqual(flush(chan));
    expect(generator.next().value).toEqual(put(actions.firebaseListenFulfilled({}, metaType)));
    expect(generator.next().value).toEqual(take(chan));
    const data = {
      eventType: eventTypes.CHILD_ADDED,
      key: '1',
      value: 'Data from channel',
    };
    expect(generator.next(data).value).toEqual(put(sagas.getUpdateAction(data, metaType)));
    expect(generator.next().value).toEqual(take(chan)); // return to listen to the channel
    generator.return(); // simulate cancellation
  });

  test('getUpdateAction CHILD_ADDED', () => {
    const metaType = metaTypes.offeringsCategories;
    const childAddedData = {
      eventType: eventTypes.CHILD_ADDED,
      key: '1',
      value: 'Data from channel',
    };

    expect(sagas.getUpdateAction(childAddedData, metaType)).toEqual(
      actions.firebaseListenChildAdded(childAddedData.key, childAddedData.value, metaType),
    );
  });

  test('getUpdateAction CHILD_CHANGED', () => {
    const metaType = metaTypes.offeringsCategories;
    const childChangedData = {
      eventType: eventTypes.CHILD_CHANGED,
      key: '1',
      value: 'Data from channel',
    };

    expect(sagas.getUpdateAction(childChangedData, metaType)).toEqual(
      actions.firebaseListenChildChanged(childChangedData.key, childChangedData.value, metaType),
    );
  });

  test('getUpdateAction CHILD_REMOVED', () => {
    const metaType = metaTypes.offeringsCategories;
    const childRemovedData = {
      eventType: eventTypes.CHILD_REMOVED,
      key: '1',
    };

    expect(sagas.getUpdateAction(childRemovedData, metaType)).toEqual(
      actions.firebaseListenChildRemoved(childRemovedData.key, metaType),
    );
  });

  test('updateItems - regular stream - success and failure', () => {
    const updates = { x: true };
    const metaType = 'someType';
    const ref = firebase.database().ref();
    const generator = cloneableGenerator(sagas.updateItems)(updates, metaType);
    expect(generator.next().value).toEqual(call([ref, ref.update], updates));

    const successGenerator = generator.clone();
    expect(successGenerator.next().value).toEqual(put(actions.firebaseUpdateFulfilled(metaType)));
    expect(successGenerator.next().done).toEqual(true);

    const failGenerator = generator.clone();
    const error = new Error('An error occured');
    expect(failGenerator.throw(error).value).toEqual(
      put(actions.firebaseUpdateRejected(error, metaType)),
    );
    expect(failGenerator.next().done).toEqual(true);
  });

  test('removeItem - regular stream - success and failure', () => {
    const path = 'a/b/c';
    const metaType = 'someType';
    const ref = firebase.database().ref(path);
    const generator = cloneableGenerator(sagas.removeItem)(path, metaType);
    expect(generator.next().value).toEqual(call([ref, ref.remove]));

    const successGenerator = generator.clone();
    expect(successGenerator.next().value).toEqual(put(actions.firebaseRemoveFulfilled(metaType)));
    expect(successGenerator.next().done).toEqual(true);

    const failGenerator = generator.clone();
    const error = new Error('An error occured');
    expect(failGenerator.throw(error).value).toEqual(
      put(actions.firebaseRemoveRejected(error, metaType)),
    );
    expect(failGenerator.next().done).toEqual(true);
  });

  test.skip('getUpdateOfferingUpdates', () => {
    const uid = '1';
    const contactId = '123';
    const name = 'John Doe';
    const phone = '123456789';

    const updates = {
      [`users/${uid}/contacts/${contactId}/name`]: name,
      [`users/${uid}/contacts/${contactId}/phone`]: phone,
    };

    expect(
      sagas.getUserContactsUpdates({
        uid,
        contactId,
        name,
        phone,
      }),
    ).toEqual(updates);
  });

  test.skip('getUserContactsPath', () => {
    const uid = '1';
    const contactId = '123';
    const path = `users/${uid}/contacts/${contactId}`;
    expect(sagas.getUserContactsPath({ uid, contactId })).toEqual(path);
  });
});
