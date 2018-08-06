/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import EggEditorRenderer from './EggEditorRenderer';
import { nowAsMoment } from '../../utils/dateHelper';
import { type Chicken, type Egg, type Navigation } from '../../types';

type Props = {
  chickenId: string,
  chickens: {
    [chickenId: string]: Chicken,
  },
  eggId: string,
  egg: Egg,
  flockId: string,
  navigation: Navigation,
  defaultDate: string,
  userId: string,
};

type State = {
  damaged: boolean,
  chickenId: string,
  chickenName: string,
  date: string,
  notes: string,
  weight: string | number,
};

class EggEditor extends React.Component<Props, State> {
  state = {
    damaged: false,
    chickenId: '',
    chickenName: '',
    date: '',
    notes: '',
    weight: '',
  };

  componentDidMount() {
    const {
      chickenId, defaultDate, egg, chickens,
    } = this.props;
    let defaultState = {
      ...this.state,
      chickenId: chickenId || 'unknown',
      chickenName: chickenId ? chickens[chickenId].name : '',
      date: defaultDate,
    };

    if (egg) {
      const { userId, modified, ...rest } = egg;
      defaultState = { ...defaultState, ...rest };
    }
    this.setState({ ...defaultState });
  }

  onSaveForm = () => {
    const { egg, userId } = this.props;
    const result = {
      ...egg,
      ...this.state,
      modified: moment().toISOString(),
      userId,
    };
    console.log('saving egg: ', result);
  };

  onFieldChanged = (fieldName, value) => {
    console.log('field changed:', { fieldName, value });
    this.setState({ [fieldName]: value });
  };

  handlePickItem = (itemValue) => {
    const { chickens } = this.props;
    this.setState({
      chickenId: itemValue,
      chickenName: chickens[itemValue].name,
    });
  };

  handleToggleSwitch = () => this.setState(state => ({
    damaged: !state.damaged,
  }));

  render() {
    const { navigation, chickens } = this.props;

    return (
      <EggEditorRenderer
        navigation={navigation}
        chickens={chickens}
        {...this.state}
        onFieldChanged={this.onFieldChanged}
        handleToggleSwitch={this.handleToggleSwitch}
        handlePickItem={this.handlePickItem}
        onSaveForm={this.onSaveForm}
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
    userId: userSettings.key,
    defaultDate: defaultDate || nowAsMoment().format('YYYY-MM-DD'),
  };
};

export default connect(mapStateToProps)(EggEditor);
