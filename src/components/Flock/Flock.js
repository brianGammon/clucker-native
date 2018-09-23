/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import FlockRenderer from './FlockRenderer';
import { type Chicken, type Navigation } from '../../types';

type Props = {
  navigation: Navigation,
  chickens: {
    [string]: Chicken,
  },
};

const Flock = ({ navigation, chickens }: Props) => (
  <FlockRenderer navigation={navigation} chickens={chickens} />
);

const mapStateToProps = ({ chickens }) => ({
  chickens: chickens.data,
});

export default connect(mapStateToProps)(Flock);
