/* @flow */
import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import {
  type NavigationContainer,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { removeInitialUrl as removeInitialUrlAction } from '../redux/actions';
import { type Navigation } from '../types';

const urlToPathAndParams = (uriPrefix, url) => {
  const params = {};
  const delimiter = uriPrefix || '://';
  let path = url.split(delimiter)[1];
  if (!path) {
    path = url;
  }
  return {
    path,
    params,
  };
};

type Props = {
  navigation: Navigation,
  initialUrl: string,
  currentFlockId: string,
  removeInitialUrl: () => void,
};

export default (
  Comp: NavigationContainer<any, any, any>,
  uriPrefix: string,
) => {
  const { router } = Comp;

  class WrappedComponent extends Component<Props> {
    static router = router;

    componentDidMount() {
      const { initialUrl, removeInitialUrl } = this.props;
      if (initialUrl) {
        this.handleOpenURL({ url: initialUrl });
        removeInitialUrl();
      }
      Linking.addEventListener('url', this.handleOpenURL);
    }

    componentDidUpdate(prevProps) {
      const { currentFlockId: prev } = prevProps;
      const { currentFlockId: curr, navigation } = this.props;
      // TODO: Side effect! - Should be moved into Sagas
      if (prev && curr !== prev) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'Tabs',
              action: NavigationActions.navigate({
                routeName: 'Settings',
              }),
            }),
          ],
          key: null,
        });
        navigation.dispatch(resetAction);
      }
    }

    componentWillUnmount() {
      Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = ({ url }) => {
      const parsedUrl = urlToPathAndParams(uriPrefix, url);
      const { navigation } = this.props;
      const { path, params } = parsedUrl;
      const action = router.getActionForPathAndParams(path, params);
      if (action) {
        if (action.action) {
          if (action.action.action) {
            navigation.dispatch(action.action.action);
          } else {
            navigation.dispatch(action.action);
          }
        } else {
          navigation.dispatch(action);
        }
      }
    };

    render() {
      const { navigation } = this.props;
      return <Comp navigation={navigation} />;
    }
  }

  const mapStateToProps = ({
    initialUrl,
    userSettings: {
      data: { currentFlockId },
    },
  }) => ({ initialUrl, currentFlockId });
  const mapDispatchToProps = dispatch => ({
    removeInitialUrl: () => dispatch(removeInitialUrlAction()),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WrappedComponent);
};
