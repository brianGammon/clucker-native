/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Linking } from 'react-native';

import Splash from '../Splash';
import RootNavigator from '../../navigation/RootNavigator';
import NavigationService from '../../navigation/NavigationService';
import * as actions from '../../redux/actions';
import { metaTypes, appStates, actionTypes } from '../../redux/constants';
import { type UserSettings } from '../../types';

type Props = {
  getFlock: (flockId: string) => void,
  listenToChickens: (flockId: string) => void,
  listenToEggs: (flockId: string) => void,
  setInitialUrl: (url: string) => void,
  clearFlock: (flockId: string) => void,
  userSettings: UserSettings,
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

  componentDidUpdate(prevProps: Props) {
    const {
      flocks: prevFlocks,
      currentFlockId: prevCurrentFlockId,
    } = prevProps.userSettings;
    const {
      userSettings: { flocks, currentFlockId },
      getFlock,
      clearFlock,
      listenToChickens,
      listenToEggs,
    } = this.props;

    const oldSet = new Set(Object.keys(prevFlocks || {}));
    const newSet = new Set(Object.keys(flocks || {}));
    const deleted = new Set([...oldSet].filter(key => !newSet.has(key)));
    const added = new Set([...newSet].filter(key => !oldSet.has(key)));
    console.log({ added, deleted });
    [...deleted].forEach(key => clearFlock(key));
    [...added].forEach(key => getFlock(key));

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
      return <Splash />;
    }
    return (
      <RootNavigator
        ref={nav => NavigationService.setTopLevelNavigator(nav)}
      />
    );
  }
}

const mapStateToProps = ({ appState, userSettings }) => ({
  appState,
  userSettings: userSettings.data,
});
const mapDispatchToProps = dispatch => ({
  listenToChickens: flockId => dispatch(actions.listenToChickens(flockId)),
  listenToEggs: flockId => dispatch(actions.listenToEggs(flockId)),
  getFlock: flockId => dispatch(actions.getFlock(flockId, metaTypes.flocks)),
  setInitialUrl: url => dispatch(actions.setInitialUrl(url)),
  clearFlock: flockId => dispatch({ type: actionTypes.CLEAR_FLOCK, payload: flockId }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
