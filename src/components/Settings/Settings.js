/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import SettingsRenderer from './SettingsRenderer';
import { type Navigation, type User } from '../../types';
import { actionTypes } from '../../redux/constants';

type Props = {
  navigation: Navigation,
  signOut: () => void,
  user: User,
  hasFlocks: boolean,
};

class Settings extends React.Component<Props> {
  handleSignOut = () => {
    const { navigation, signOut } = this.props;
    signOut();
    navigation.navigate('SignedOut');
  };

  render() {
    const { user, hasFlocks } = this.props;
    return (
      <SettingsRenderer
        user={user}
        hasFlocks={hasFlocks}
        handleSignOut={this.handleSignOut}
      />
    );
  }
}

const mapStateToProps = ({
  auth: { user },
  userSettings: {
    data: { flocks },
  },
}) => ({
  user,
  hasFlocks: flocks && Object.keys(flocks).length > 0,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch({ type: actionTypes.SIGN_OUT_REQUESTED }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
