import React, { Component } from 'react';
import { Linking } from 'react-native';
import { connect } from 'react-redux';
import { removeInitialUrl as removeInitialUrlAction } from '../redux/actions';

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
  navigation: any,
  initialUrl: string,
  removeInitialUrl: () => void,
};

export default (Comp, uriPrefix) => {
  const { router } = Comp;

  class WrappedComponent extends Component<Props> {
    static router = router;

    componentDidMount() {
      // TODO: move to redux state instead of AsyncStorage
      const { initialUrl, removeInitialUrl } = this.props;
      if (initialUrl) {
        this.handleOpenURL({ url: initialUrl });
        removeInitialUrl();
      }
      Linking.addEventListener('url', this.handleOpenURL);
    }

    componentWillUnmount() {
      Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = ({ url }) => {
      const parsedUrl = urlToPathAndParams(uriPrefix, url);
      const { navigation } = this.props;
      if (parsedUrl) {
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
      }
    };

    render() {
      const { navigation } = this.props;
      return <Comp navigation={navigation} />;
    }
  }

  const mapStateToProps = ({ initialUrl }) => ({ initialUrl });
  const mapDispatchToProps = dispatch => ({
    removeInitialUrl: () => dispatch(removeInitialUrlAction()),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WrappedComponent);
};
