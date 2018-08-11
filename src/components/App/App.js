/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Linking } from 'react-native';

import Splash from '../Splash';
import RootNavigator from '../../navigation/RootNavigator';
import * as actions from '../../redux/actions';
import { metaTypes, appStates } from '../../redux/constants';
import { type UserSettings } from '../../types';

type Props = {
  getFlock: (flockId: string) => void,
  listenToChickens: (flockId: string) => void,
  listenToEggs: (flockId: string) => void,
  setInitialUrl: (url: string) => void,
  userSettings: {
    inProgress: boolean,
    error: string,
    data: UserSettings,
  },
  appState: string,
};

type Event = {
  url: string,
};

class App extends React.Component<Props> {
  constructor() {
    super();

    this.handleOpenURL = this.handleOpenURL.bind(this);
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then(url => url && this.handleOpenURL({ url }));
  }

  // shouldComponentUpdate() {
  //   const { initialized } = this.state;
  //   if (!initialized) {
  //     return false;
  //   }
  //   return true;
  // }

  componentDidUpdate(prevProps: Props) {
    const prevUserSettings = prevProps.userSettings;
    const {
      userSettings,
      getFlock,
      listenToChickens,
      listenToEggs,
    } = this.props;
    const newFlocks = userSettings.data && userSettings.data.flocks;
    const newCurrentFlockId = userSettings.data && userSettings.data.currentFlockId;
    const oldFlocks = prevUserSettings.data && prevUserSettings.data.flocks;
    const oldCUrrentFlockId = prevUserSettings.data && prevUserSettings.data.currentFlockId;
    const flocksChanged = newFlocks !== oldFlocks;
    const currentFlockIdChanged = newCurrentFlockId !== oldCUrrentFlockId;
    console.log('DidUpdate');
    if (flocksChanged) {
      console.log('Flocks changed');
      // Dispatch to clear current flocks
      Object.keys(userSettings.data.flocks || {}).forEach(key => getFlock(key));
    }

    if (currentFlockIdChanged) {
      console.log('Start listening to flock data');
      listenToChickens(newCurrentFlockId);
      listenToEggs(newCurrentFlockId);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event: Event) => {
    const { setInitialUrl } = this.props;
    setInitialUrl(event.url);
  };

  render() {
    const { appState } = this.props;
    if (appState === appStates.STARTING) {
      console.log('RENDERING SPLASH');
      return <Splash />;
    }
    console.log('RENDERING APP');
    return <RootNavigator />;
  }
}

const mapStateToProps = ({ appState, userSettings }) => ({
  appState,
  userSettings,
});
const mapDispatchToProps = dispatch => ({
  listenToChickens: flockId => dispatch(actions.listenToChickens(flockId)),
  listenToEggs: flockId => dispatch(actions.listenToEggs(flockId)),
  getFlock: flockId => dispatch(actions.getFlock(flockId, metaTypes.flocks)),
  setInitialUrl: url => dispatch(actions.setInitialUrl(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
