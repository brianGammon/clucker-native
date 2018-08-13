/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import SettingsRenderer from './SettingsRenderer';
import { type Navigation, type Flock, type UserSettings } from '../../types';
import { firebaseUpdateRequested } from '../../redux/actions';
import { actionTypes, metaTypes } from '../../redux/constants';

type Props = {
  navigation: Navigation,
  flocks: {
    [flockId: string]: Flock,
  },
  userSettings: UserSettings,
  userId: string,
  signOut: () => void,
  saveUserSettings: (userId: string, userSettings: UserSettings) => void,
};

class Settings extends React.Component<Props> {
  handleSelectFlock = (flockId) => {
    const { userId, userSettings, saveUserSettings } = this.props;
    const newUserSettings = { ...userSettings, currentFlockId: flockId };
    saveUserSettings(userId, newUserSettings);
  };

  handleSignOut = () => {
    const { navigation, signOut } = this.props;
    signOut();
    navigation.navigate('SignedOut');
  };

  render() {
    const {
      flocks,
      userId,
      navigation,
      userSettings: { currentFlockId },
    } = this.props;
    return (
      <SettingsRenderer
        flocks={flocks}
        currentFlockId={currentFlockId}
        userId={userId}
        handleSignOut={this.handleSignOut}
        handleSelectFlock={this.handleSelectFlock}
        navigation={navigation}
      />
    );
  }
}

const mapStateToProps = ({ flocks, userSettings, auth: { user } }) => ({
  flocks: flocks.data,
  userSettings: userSettings.data,
  userId: user ? user.uid : '',
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch({ type: actionTypes.SIGN_OUT_REQUESTED }),
  saveUserSettings: (userId: string, userSettings: UserSettings) => dispatch(
    firebaseUpdateRequested({ userId, userSettings }, metaTypes.userSettings),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
