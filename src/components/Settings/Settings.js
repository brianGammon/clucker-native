/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import SettingsRenderer from './SettingsRenderer';
import { type Navigation, type Flock } from '../../types';

type Props = {
  navigation: Navigation,
  flocks: {
    [flockId: string]: Flock,
  },
  currentFlockId: string,
  userId: string,
};

class Settings extends React.Component<Props> {
  render() {
    const { flocks, currentFlockId, userId } = this.props;
    return (
      <SettingsRenderer
        flocks={flocks}
        currentFlockId={currentFlockId}
        userId={userId}
      />
    );
  }
}

const mapStateToProps = ({ flocks, userSettings }) => ({
  flocks: flocks.data,
  currentFlockId: userSettings.data.currentFlockId,
  userId: userSettings.key,
});

export default connect(mapStateToProps)(Settings);
