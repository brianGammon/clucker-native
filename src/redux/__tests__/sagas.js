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


  test('getChickensPath for remove', () => {
    const userId = 'user1';
    const chickenId = 'chicken1';
    const path = `userData/${userId}/chickens/${chickenId}`;
    expect(sagas.getChickensPath(userId, { chickenId })).toEqual(path);
  });

  test('getChickensPath for create', () => {
    const userId = 'user1';
    const path = `userData/${userId}/chickens`;
    expect(
      sagas.getChickensPath(userId, { data: { key1: 'value1' } }),
    ).toEqual(path);
  });

  test('getChickensUpdate', () => {
    const userId = 'user1';
    const updates = {
      chickenId: 'chicken1',
      data: {
        name: 'Test Chicken',
        breed: 'Some Breed',
        hatched: '2018-10-06',
      },
    };

    expect(sagas.getChickensUpdate(userId, updates)).toMatchSnapshot();
  });

  test('getEggsPath for remove', () => {
    const userId = 'user1';
    const eggId = 'egg1';
    const path = `userData/${userId}/eggs/${eggId}`;
    expect(sagas.getEggsPath(userId, { eggId })).toEqual(path);
  });

  test('getEggsPath for create', () => {
    const userId = 'user1';
    const path = `userData/${userId}/eggs`;
    expect(sagas.getEggsPath(userId, { data: { key1: 'value1' } })).toEqual(
      path,
    );
  });

  test('getEggsUpdate', () => {
    const userId = 'user1';
    const updates = {
      eggId: 'egg1',
      data: {
        chickenId: 'chicken1',
        date: '2018-10-06',
      },
    };

    expect(sagas.getEggsUpdate(userId, updates)).toMatchSnapshot();
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
      data: {
        name: 'Test Chicken',
        breed: 'Some Breed',
        hatched: '2018-10-06',
      },
    };
    const expectedPath = 'userData/user1/chickens';
    const userId = 'user1';
    const action = actions.firebaseCreateRequested(payload, metaTypes.chickens);
    const selector = sagas.getChickensPath;
    const result = selector(userId, payload);
    expect(generator.next().value).toEqual(take(a.CREATE_REQUESTED));
    expect(JSON.stringify(generator.next(action).value)).toEqual(JSON.stringify(select(state => state.auth.user.uid)));
    expect(generator.next(userId).value).toEqual(
      call(selector, userId, action.payload),
    );
    expect(generator.next(result).value).toEqual(
      fork(sagas.addItems, expectedPath, payload.data, action.meta.type),
    );
  });

  test(`watchCreateRequested ${metaTypes.eggs}`, () => {
    const generator = sagas.watchCreateRequested();
    const payload = {
      data: {
        chickenId: 'chicken1',
        date: '2018-10-06',
      },
    };
    const expectedPath = 'userData/user1/eggs';
    const userId = 'user1';
    const action = actions.firebaseCreateRequested(payload, metaTypes.eggs);
    const selector = sagas.getEggsPath;
    const result = selector(userId, payload);
    expect(generator.next().value).toEqual(take(a.CREATE_REQUESTED));
    expect(JSON.stringify(generator.next(action).value)).toEqual(JSON.stringify(select(state => state.auth.user.uid)));
    expect(generator.next(userId).value).toEqual(
      call(selector, userId, action.payload),
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

  test(`watchUpdateRequested ${metaTypes.chickens}`, () => {
    const generator = sagas.watchUpdateRequested();
    const payload = {
      chickenId: 'chicken1',
      data: {
        name: 'Test Chicken',
        breed: 'Some Breed',
        hatched: '2018-10-06',
      },
    };
    const expectedUpdates = {
      'userData/user1/chickens/chicken1': payload.data,
    };
    const userId = 'user1';
    const action = actions.firebaseUpdateRequested(payload, metaTypes.chickens);
    const selector = sagas.getChickensUpdate;
    const result = selector(userId, payload);
    expect(generator.next().value).toEqual(take(a.UPDATE_REQUESTED));
    expect(JSON.stringify(generator.next(action).value)).toEqual(JSON.stringify(select(state => state.auth.user.uid)));
    expect(generator.next(userId).value).toEqual(
      call(selector, userId, action.payload),
    );
    expect(generator.next(result).value).toEqual(
      fork(sagas.updateItems, expectedUpdates, action.meta.type),
    );
  });

  test(`watchUpdateRequested ${metaTypes.eggs}`, () => {
    const generator = sagas.watchUpdateRequested();
    const payload = {
      eggId: 'egg1',
      data: {
        chickenId: 'chicken1',
        date: '2018-10-06',
      },
    };
    const userId = 'user1';
    const expectedUpdates = {
      'userData/user1/eggs/egg1': payload.data,
    };
    const action = actions.firebaseUpdateRequested(payload, metaTypes.eggs);
    const selector = sagas.getEggsUpdate;
    const result = selector(userId, payload);
    expect(generator.next().value).toEqual(take(a.UPDATE_REQUESTED));
    expect(JSON.stringify(generator.next(action).value)).toEqual(JSON.stringify(select(state => state.auth.user.uid)));
    expect(generator.next(userId).value).toEqual(
      call(selector, userId, action.payload),
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

  test(`watchRemoveRequested ${metaTypes.chickens}`, () => {
    const generator = sagas.watchRemoveRequested();
    const path = 'userData/user1/chickens/chicken1';

    const action = actions.firebaseRemoveRequested(
      { chickenId: 'chicken1' },
      metaTypes.chickens,
    );
    const selector = sagas.getChickensPath;
    const userId = 'user1';
    expect(generator.next().value).toEqual(take(a.REMOVE_REQUESTED));
    expect(JSON.stringify(generator.next(action).value)).toEqual(JSON.stringify(select(state => state.auth.user.uid)));
    expect(generator.next(userId).value).toEqual(
      call(selector, userId, action.payload),
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
      all([
        put(actions.listenToChickens('user1')),
        put(actions.listenToEggs('user1')),
      ]),
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
    expect(generator.next().value).toEqual(put(actions.firebaseRemoveAllListenersRequested()));
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
      sagas.getUpdateAction(childAddedEvent, metaTypes.chickens),
    ).toEqual(
      actions.firebaseListenChildAdded(
        childAddedEvent.key,
        childAddedEvent.data,
        metaTypes.chickens,
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
      sagas.getUpdateAction(childChangedEvent, metaTypes.chickens),
    ).toEqual(
      actions.firebaseListenChildChanged(
        childChangedEvent.key,
        childChangedEvent.data,
        metaTypes.chickens,
      ),
    );
  });

  test('getUpdateAction CHILD_REMOVED_EVENT', () => {
    const childRemovedEvent = {
      eventType: eventTypes.CHILD_REMOVED_EVENT,
      key: '1',
    };

    expect(
      sagas.getUpdateAction(childRemovedEvent, metaTypes.chickens),
    ).toEqual(
      actions.firebaseListenChildRemoved(
        childRemovedEvent.key,
        metaTypes.chickens,
      ),
    );
  });

  test('getUpdateAction default case', () => {
    const childRemovedEvent = {
      eventType: 'UNKNOWN_TYPE',
      key: '1',
    };

    expect(
      sagas.getUpdateAction(childRemovedEvent, metaTypes.chickens),
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
    const checkedMetaType = metaTypes.chickens;

    const generator = cloneableGenerator(sagas.watchListener)(checkedMetaType);

    expect(generator.next().value).toEqual(take(a.LISTEN_REQUESTED));

    const regularGenerator = generator.clone();
    const checkedListenRequestAction = actions.listenToChickens('user1');
    const checkedListenRemoveAction = actions.firebaseRemoveListenerRequested(false, metaTypes.chickens);
    const unwantedListenRequestAction = actions.listenToEggs('user1');
    const unwantedListenRemoveAction = actions.firebaseRemoveListenerRequested(false, metaTypes.eggs);
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
    const image = {
      path: 'tmp/path1',
      width: 480,
      height: 480,
    };
    const resizedImage = {
      path: 'tmp/thumbPath1',
    };
    const ref = firebase.storage().ref();
    const photoRef = ref.child(`uploads/user:${userId}/123456789-480x480`);
    const thumbRef = ref.child(`uploads/user:${userId}/123456789-128x128`);
    const generator = cloneableGenerator(sagas.addToStorage)(userId, image);
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
    expect(JSON.stringify(generator.next(result).value)).toEqual(JSON.stringify(select(state => state.auth.user.uid)));
    expect(JSON.stringify(generator.next('user1').value)).toEqual(JSON.stringify(select(state => eggsByChickenSelector(state.eggs.data, action.payload.chickenId))));
    expect(generator.next(eggs).value).toEqual(
      call([eggsRef, eggsRef.update], updates),
    );

    const chickensRef = ref.child('/chickens/flock1/chicken1');
    expect(generator.next().value).toEqual(call([chickensRef, chickensRef.remove]));
    expect(generator.next().value).toEqual(put({ type: a.DELETE_CHICKEN_FULFILLED }));
    expect(generator.next().value).toEqual(call([NavigationService, NavigationService.resetTabs], 'Flock'));
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
    expect(generator.next(result).value).toEqual(fork(sagas.addToStorage, action.payload.userId, action.payload.newImage));

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
    expect(generator.next(result).value).toEqual(put(actions.firebaseUpdateRequested({ chickenId: action.payload.chickenId, data: action.payload.data }, metaTypes.chickens)));

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
    expect(generator.next(prevChickenState).value).toEqual(fork(sagas.addToStorage, action.payload.userId, action.payload.newImage));
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
    expect(generator.next(result).value).toEqual(put(actions.firebaseUpdateRequested({ chickenId: action.payload.chickenId, data: action.payload.data }, metaTypes.chickens)));
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
    expect(generator.next(prevChickenState).value).toEqual(fork(sagas.addToStorage, action.payload.userId, action.payload.newImage));

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
    expect(generator.next(result).value).toEqual(put(actions.firebaseCreateRequested({ chickenId: action.payload.chickenId, data: action.payload.data }, metaTypes.chickens)));
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
    expect(generator.next(prevChickenState).value).toEqual(put(actions.firebaseCreateRequested({ chickenId: action.payload.chickenId, data: action.payload.data }, metaTypes.chickens)));
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
