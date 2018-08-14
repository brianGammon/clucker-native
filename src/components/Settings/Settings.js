/* @flow */
import * as React from 'react';
import { Alert } from 'react-native';
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

const formDefaultValues = {
  value: '',
  error: '',
  touched: false,
};

class Settings extends React.Component<Props> {
  componentDidUpdate(prevProps) {
    const {
      userSettings: { currentFlockId },
      flocks,
    } = this.props;

    if (
      currentFlockId
      && currentFlockId !== prevProps.userSettings.currentFlockId
    ) {
      Alert.alert(`"${flocks[currentFlockId].name}" is now active`, null, [
        { text: 'OK' },
      ]);
    }
  }

  resetForm = (form: string) => {
    this.setState({ [form]: { ...formDefaultValues } });
  };

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
      userSettings: { currentFlockId },
    } = this.props;
    return (
      <SettingsRenderer
        flocks={flocks}
        currentFlockId={currentFlockId}
        userId={userId}
        handleSignOut={this.handleSignOut}
        handleSelectFlock={this.handleSelectFlock}
      />
    );
  }
}

const mapStateToProps = ({
  flocks,
  userSettings,
  auth: { user },
  joinForm: { error: joinError, inProgress: joinInProgess },
}) => ({
  flocks: flocks.data,
  userSettings: userSettings.data,
  userId: user ? user.uid : '',
  joinError,
  joinInProgess,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch({ type: actionTypes.SIGN_OUT_REQUESTED }),
  saveUserSettings: (userId: string, userSettings: UserSettings) => dispatch(
    firebaseUpdateRequested({ userId, userSettings }, metaTypes.userSettings),
  ),
  joinFlock: (userId: string, flockId: string) => dispatch({
    type: actionTypes.JOIN_FLOCK_REQUESTED,
    payload: { userId, flockId },
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
