import React from 'react';
import { connect } from 'react-redux';
import FlockStatsRenderer from './FlockStatsRenderer';
import flockStatsSelector from '../../selectors/flockStatsSelector';
import currentFlockSelector from '../../selectors/currentFlockSelector';
import {
  type Navigation,
  type Flock,
  type FlockStats as FlockStatsType,
} from '../../types';

type Props = {
  navigation: Navigation,
  flock: Flock,
  stats: FlockStatsType,
};

class FlockStats extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Flock Stats'),
  });

  componentDidUpdate() {
    const { flock, navigation } = this.props;
    if (flock && flock.name) {
      if (navigation.getParam('title', 'default') !== flock.name) {
        navigation.setParams({ title: flock.name });
      }
    }
  }

  render() {
    const { stats } = this.props;
    return <FlockStatsRenderer stats={stats} />;
  }
}

const mapStateToProps = ({ userSettings, eggs, flocks }) => {
  let flock = {};
  if (userSettings.data.currentFlockId) {
    flock = currentFlockSelector(flocks.data, userSettings);
  }
  return {
    flock,
    stats: flockStatsSelector(eggs.data),
  };
};

export default connect(mapStateToProps)(FlockStats);
