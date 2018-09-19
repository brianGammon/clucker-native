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
};

class Settings extends React.Component<Props> {
  componentDidUpdate() {
    const { navigation, user } = this.props;
    if (!user) {
      navigation.navigate('Preload');
    }
  }

  handleSignOut = () => {
    const { signOut } = this.props;
    signOut();
  };

  render() {
    const { user } = this.props;
    return <SettingsRenderer user={user} handleSignOut={this.handleSignOut} />;
  }
}

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch({ type: actionTypes.SIGN_OUT_REQUESTED }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
