/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import SettingsRenderer from './SettingsRenderer';
import { type Navigation, type Flock } from '../../types';
import { actionTypes } from '../../redux/constants';

type Props = {
  navigation: Navigation,
  flocks: {
    [flockId: string]: Flock,
  },
  currentFlockId: string,
  userId: string,
  signOut: () => void,
};

class Settings extends React.Component<Props> {
  handleSignOut = () => {
    const { navigation, signOut } = this.props;
    signOut();
    navigation.navigate('SignedOut');
  };

  render() {
    const {
      flocks, currentFlockId, userId, navigation,
    } = this.props;
    return (
      <SettingsRenderer
        flocks={flocks}
        currentFlockId={currentFlockId}
        userId={userId}
        handleSignOut={this.handleSignOut}
        navigation={navigation}
      />
    );
  }
}

const mapStateToProps = ({ flocks, userSettings }) => ({
  flocks: flocks.data,
  currentFlockId: userSettings.data.currentFlockId,
  userId: userSettings.key,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch({ type: actionTypes.SIGN_OUT_REQUESTED }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
