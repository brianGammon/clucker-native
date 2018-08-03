/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import FlockRenderer from './FlockRenderer';
import {
  type Chicken,
  type Navigation,
  type Flock as FlockType,
} from '../../types';
import currentFlockSelector from '../../selectors/currentFlockSelector';
import isFlockOwnerSelector from '../../selectors/isFlockOwnerSelector';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
  flock: FlockType,
  isFlockOwner: boolean,
};

class Flock extends React.Component<Props> {
  render() {
    const {
      navigation, chickens, flock, isFlockOwner,
    } = this.props;
    console.log('IsFlockOwner: ', isFlockOwner);
    return (
      <FlockRenderer
        navigation={navigation}
        chickens={chickens}
        flock={flock}
      />
    );
  }
}

const mapStateToProps = ({ chickens, flocks, userSettings }) => ({
  chickens: chickens.items,
  flock: currentFlockSelector(flocks.items, userSettings),
  isFlockOwner: isFlockOwnerSelector(flocks.items, userSettings),
});
export default connect(mapStateToProps)(Flock);
