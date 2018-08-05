/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import EggEditorRenderer from './EggEditorRenderer';
import { nowAsMoment } from '../../utils/dateHelper';
import { type Chicken, type Egg, type Navigation } from '../../types';

type Props = {
  chickenId: string,
  chickens: {
    [string]: Chicken,
  },
  eggId: string,
  egg: Egg,
  flockId: string,
  navigation: Navigation,
  defaultDate: string,
};

class EggEditor extends React.Component<Props> {
  render() {
    const {
      navigation,
      chickenId,
      chickens,
      eggId,
      egg,
      flockId,
      defaultDate,
    } = this.props;
    console.log(eggId, flockId);
    return (
      <EggEditorRenderer
        navigation={navigation}
        egg={egg}
        chickens={chickens}
        chickenId={chickenId}
        defaultDate={defaultDate}
      />
    );
  }
}

const mapStateToProps = ({ chickens, userSettings, eggs }, { navigation }) => {
  const chickenId = navigation.getParam('chickenId', null);
  const eggId = navigation.getParam('eggId', null);
  const defaultDate = navigation.getParam('date', null);
  return {
    chickenId,
    chickens: chickens.data,
    eggId,
    egg: eggId ? eggs.data[eggId] : {},
    flockId: userSettings.data.currentFlockId,
    defaultDate: defaultDate || nowAsMoment().format('YYYY-MM-DD'),
  };
};

export default connect(mapStateToProps)(EggEditor);
