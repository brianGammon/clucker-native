import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// eslint-disable-next-line import/no-extraneous-dependencies
import devTools from 'remote-redux-devtools';

// import rootReducer from '../reducers';
import reducer from '../redux/reducer';
import rootSaga from '../redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  devTools({
    name: Platform.OS,
    hostname: 'localhost',
    port: 5678,
  }),
);
const store = createStore(reducer, enhancer);
sagaMiddleware.run(rootSaga);

export default () => store;
