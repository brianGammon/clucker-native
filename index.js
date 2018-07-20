/* @flow */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import App from './src/containers/App';
import { name as appName } from './app.json';
import createStore from './src/store';

const store = createStore();

const ConnectedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ConnectedApp);
