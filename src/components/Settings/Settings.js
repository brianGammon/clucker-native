/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import SettingsRenderer from './SettingsRenderer';
import Loading from '../Loading';
import { type Navigation, type User } from '../../types';
import { actionTypes } from '../../redux/constants';

type Props = {
  navigation: Navigation,
  signOut: () => void,
  user: User,
  hasFlocks: boolean,
  inProgress: boolean,
};

class Settings extends React.Component<Props> {
  handleSignOut = () => {
    const { navigation, signOut } = this.props;
    signOut();
    navigation.navigate('SignedOut');
  };

  render() {
    const { user, hasFlocks, inProgress } = this.props;
    if (inProgress) {
      return <Loading message="Deleting flock..." />;
    }
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
  deleteFlock: { inProgress },
}) => ({
  user,
  hasFlocks: flocks && Object.keys(flocks).length > 0,
  inProgress,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch({ type: actionTypes.SIGN_OUT_REQUESTED }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
