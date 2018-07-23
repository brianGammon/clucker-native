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

export class Flock extends React.Component<Props> {
  render() {
    const { navigation, chickens } = this.props;
    return <FlockRenderer navigation={navigation} chickens={chickens} />;
  }
}

const mapStateToProps = ({ chickens: { items } }) => ({ chickens: items });
export default connect(mapStateToProps)(Flock);
