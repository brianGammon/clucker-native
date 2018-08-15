/* @flow */
import * as React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import FlockSelectorRenderer from './FlockSelectorRenderer';
import { type Flock, type UserSettings } from '../../types';
import { firebaseUpdateRequested } from '../../redux/actions';
import { metaTypes } from '../../redux/constants';

type Props = {
  flocks: {
    [flockId: string]: Flock,
  },
  userSettings: UserSettings,
  userId: string,
  saveUserSettings: (userId: string, userSettings: UserSettings) => void,
};

class FlockSelector extends React.Component<Props> {
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

  handleSelectFlock = (flockId) => {
    const { userId, userSettings, saveUserSettings } = this.props;
    const newUserSettings = { ...userSettings, currentFlockId: flockId };
    saveUserSettings(userId, newUserSettings);
  };

  render() {
    const {
      flocks,
      userId,
      userSettings: { currentFlockId },
    } = this.props;
    return (
      <FlockSelectorRenderer
        flocks={flocks}
        currentFlockId={currentFlockId}
        userId={userId}
        handleSelectFlock={this.handleSelectFlock}
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
  saveUserSettings: (userId: string, userSettings: UserSettings) => dispatch(
    firebaseUpdateRequested({ userId, userSettings }, metaTypes.userSettings),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlockSelector);
