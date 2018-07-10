/* @flow */
import React from 'react';
import { Linking, AsyncStorage } from 'react-native';
import RootNavigator from './navigation/RootNavigator';

export interface Props {}

const handleOpenURL = ({ url }) => {
  // TODO: move to redux state instead of AsyncStorage
  AsyncStorage.setItem('initialUrl', url);
};

export default class App extends React.Component<Props> {
  componentDidMount() {
    Linking.addEventListener('url', handleOpenURL);

    Linking.getInitialURL().then((url) => {
      handleOpenURL({ url });
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', handleOpenURL);
  }

  render() {
    return <RootNavigator />;
  }
}
