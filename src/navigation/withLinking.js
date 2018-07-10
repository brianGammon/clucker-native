import React, { Component } from 'react';
import { Linking, AsyncStorage } from 'react-native';

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

export default (Comp, uriPrefix) => {
  const { router } = Comp;
  return class extends Component {
    static router = router;

    componentDidMount() {
      // TODO: move to redux state instead of AsyncStorage
      AsyncStorage.getItem('initialUrl').then((url) => {
        if (url) {
          this.handleOpenURL({ url });
          AsyncStorage.removeItem('initialUrl');
        }
        Linking.addEventListener('url', this.handleOpenURL);
      });
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
  };
};
