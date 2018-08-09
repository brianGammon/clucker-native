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
};

class Settings extends React.Component<Props> {
  render() {
    const { flocks } = this.props;
    return <SettingsRenderer flocks={flocks} />;
  }
}

const mapStateToProps = ({ flocks }) => ({
  flocks: flocks.data,
});

export default connect(mapStateToProps)(Settings);
