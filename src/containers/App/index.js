/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Linking } from 'react-native';
// $FlowFixMe
import firebase from 'react-native-firebase';

import Splash from '../../components/Splash';
import RootNavigator from '../../navigation/RootNavigator';
import * as actions from '../../redux/actions';
import { metaTypes } from '../../redux/constants';
import type { UserSettings } from '../../types';

type Props = {
  getFlock: (flockId: string) => void,
  listenToUserSettings: (uid: string) => void,
  listenToChickens: (flockId: string) => void,
  listenToEggs: (flockId: string) => void,
  setInitialUrl: (url: string) => void,
  userSettings: {
    inProgress: boolean,
    error: string,
    items: UserSettings,
  },
};

type State = {
  initialized: boolean,
};

class App extends React.Component<Props, State> {
  authUnsubscriber = null;

  constructor() {
    super();

    this.handleOpenURL = this.handleOpenURL.bind(this);

    this.state = {
      initialized: false,
    };
  }

  componentDidMount() {
    const { listenToUserSettings } = this.props;
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then(url => url && this.handleOpenURL({ url }));

    this.authUnsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('Logged in, start listening');
        listenToUserSettings(user.uid);
      } else {
        console.log('Logged out, stop listening');
        // clear all listeners
      }
      this.setState({ initialized: true });
    });
  }

  shouldComponentUpdate() {
    const { initialized } = this.state;
    if (!initialized) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    const prevUserSettings = prevProps.userSettings;
    const {
      userSettings, getFlock, listenToChickens, listenToEggs,
    } = this.props;
    const newFlocks = userSettings.items && userSettings.items.flocks;
    const newCurrentFlockId = userSettings.items && userSettings.items.currentFlockId;
    const oldFlocks = prevUserSettings.items && prevUserSettings.items.flocks;
    const oldCUrrentFlockId = prevUserSettings.items && prevUserSettings.items.currentFlockId;
    const flocksChanged = newFlocks !== oldFlocks;
    const currentFlockIdChanged = newCurrentFlockId !== oldCUrrentFlockId;

    if (flocksChanged) {
      console.log('Flocks changed');
      // Dispatch to clear current flocks
      Object.keys(userSettings.items.flocks).forEach(key => getFlock(key));
    }

    if (currentFlockIdChanged) {
      console.log('Start listening to flock data');
      listenToChickens(newCurrentFlockId);
      listenToEggs(newCurrentFlockId);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);

    if (this.authUnsubscriber) {
      this.authUnsubscriber();
    }
  }

  handleOpenURL = ({ url }) => {
    const { setInitialUrl } = this.props;
    setInitialUrl(url);
  };

  render() {
    const { initialized } = this.state;
    if (!initialized) {
      console.log('RENDERING SPLASH');
      return <Splash />;
    }
    console.log('RENDERING APP');
    return <RootNavigator />;
  }
}

const mapStateToProps = ({ userSettings }) => ({
  userSettings,
});
const mapDispatchToProps = dispatch => ({
  listenToUserSettings: uid => dispatch(actions.listenToUserSettings(uid)),
  listenToChickens: flockId => dispatch(actions.listenToChickens(flockId)),
  listenToEggs: flockId => dispatch(actions.listenToEggs(flockId)),
  getFlock: flockId => dispatch(actions.getFlock(flockId, metaTypes.flocks)),
  setInitialUrl: url => dispatch(actions.setInitialUrl(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
