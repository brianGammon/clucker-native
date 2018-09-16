/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { Linking } from 'react-native';
import { Root } from 'native-base';
import Loading from '../Loading';
import RootNavigator from '../../navigation/RootNavigator';
import NavigationService from '../../navigation/NavigationService';
import * as actions from '../../redux/actions';
import { appStates } from '../../redux/constants';

type Props = {
  setInitialUrl: (url: string) => void,
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

const mapStateToProps = ({ appState }) => ({
  appState,
});

const mapDispatchToProps = dispatch => ({
  setInitialUrl: url => dispatch(actions.setInitialUrl(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
