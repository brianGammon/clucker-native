/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Linking } from 'react-native';
import { Root } from 'native-base';
import Loading from '../Loading';
import RootNavigator from '../../navigation/RootNavigator';
import NavigationService from '../../navigation/NavigationService';
import * as actions from '../../redux/actions';
import { appStates, actionTypes } from '../../redux/constants';
import { type UserSettings } from '../../types';

type Props = {
  listenToChickens: (flockId: string) => void,
  listenToEggs: (flockId: string) => void,
  setInitialUrl: (url: string) => void,
  syncFlocks: (added: string[], deleted: string[]) => void,
  userSettings: {
    data: UserSettings,
    initialized: boolean,
  },
  appState: string,
  flocksInitialized: boolean,
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

  componentDidUpdate(prevProps: Props) {
    const {
      flocks: prevFlocks,
      currentFlockId: prevCurrentFlockId,
    } = prevProps.userSettings.data;
    const {
      userSettings: {
        initialized: userSettingsInitialized,
        data: { flocks, currentFlockId },
      },
      syncFlocks,
      listenToChickens,
      listenToEggs,
      flocksInitialized,
    } = this.props;

    // check if the flocks have changed
    const oldSet = new Set(Object.keys(prevFlocks || {}));
    const newSet = new Set(Object.keys(flocks || {}));
    const deleted = new Set([...oldSet].filter(key => !newSet.has(key)));
    const added = new Set([...newSet].filter(key => !oldSet.has(key)));

    if (userSettingsInitialized) {
      // only need to sync flocks if userSettings has finished listening
      let doSyncFlocks = true;
      if (deleted.size === 0 && added.size === 0 && flocksInitialized) {
        doSyncFlocks = false;
      }

      // Don't bother syncing if no changes have occurred
      if (doSyncFlocks) {
        syncFlocks([...added], [...deleted]);
      }
    }
    // If the current flock changed, need to fetch the eggs
    if (currentFlockId && currentFlockId !== prevCurrentFlockId) {
      listenToChickens(currentFlockId);
      listenToEggs(currentFlockId);
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
      return <Loading message="Welcome to Clucker" />;
    }
    return (
      <Root>
        <RootNavigator
          ref={nav => NavigationService.setTopLevelNavigator(nav)}
        />
      </Root>
    );
  }
}

const mapStateToProps = ({
  appState,
  userSettings,
  flocks: { initialized: flocksInitialized },
}) => ({
  appState,
  userSettings,
  flocksInitialized,
});

const mapDispatchToProps = dispatch => ({
  listenToChickens: flockId => dispatch(actions.listenToChickens(flockId)),
  listenToEggs: flockId => dispatch(actions.listenToEggs(flockId)),
  setInitialUrl: url => dispatch(actions.setInitialUrl(url)),
  syncFlocks: (added, deleted) => dispatch({
    type: actionTypes.SYNC_FLOCKS_REQUESTED,
    payload: { added, deleted },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
