import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// import rootReducer from '../reducers';
import reducer from '../redux/reducer';
import rootSaga from '../redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default () => store;
