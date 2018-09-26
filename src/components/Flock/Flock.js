/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import Loading from '../Loading';
import FlockRenderer from './FlockRenderer';
import { type Chicken, type Navigation } from '../../types';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
  loading: boolean,
};

const Flock = ({ navigation, chickens, loading }: Props) => {
  if (loading) {
    return <Loading message="Loading Flock..." />;
  }
  return <FlockRenderer navigation={navigation} chickens={chickens} />;
};

const mapStateToProps = ({ chickens }) => ({
  chickens: chickens.data,
  loading: chickens.inProgress,
});

export default connect(mapStateToProps)(Flock);
