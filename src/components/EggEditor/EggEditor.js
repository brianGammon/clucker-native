/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import EggEditorRenderer from './EggEditorRenderer';
import { nowAsMoment } from '../../utils/dateHelper';
import { type Chicken, type Egg, type Navigation } from '../../types';
import { metaTypes } from '../../redux/constants';
import {
  firebaseUpdateRequested,
  firebaseCreateRequested,
} from '../../redux/actions';

type Props = {
  inProgress: boolean,
  error: string,
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
  saveForm: (payload: { flockId: string, eggId?: string, data: Egg }) => void,
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

  componentDidUpdate(prevProps) {
    const prevInProgress = prevProps.inProgress;
    const { inProgress, error, navigation } = this.props;
    if (!inProgress && prevInProgress && error === '') {
      navigation.goBack();
    }
  }

  onSaveForm = () => {
    const {
      egg, userId, flockId, eggId, saveForm,
    } = this.props;
    const data = {
      ...egg,
      ...this.state,
      modified: moment().toISOString(),
      userId,
    };
    const payload = { flockId, eggId, data };
    saveForm(payload);
  };

  onFieldChanged = (fieldName, value) => {
    this.setState({ [fieldName]: value });
  };

  handlePickItem = (itemValue) => {
    const { chickens } = this.props;
    this.setState({
      chickenId: itemValue,
      chickenName: chickens[itemValue] ? chickens[itemValue].name : 'Unknown',
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

const mapStateToProps = (
  {
    chickens, userSettings, eggs, auth: { user },
  },
  { navigation },
) => {
  const chickenId = navigation.getParam('chickenId', null);
  const eggId = navigation.getParam('eggId', null);
  const defaultDate = navigation.getParam('date', null);
  return {
    chickenId,
    chickens: chickens.data,
    eggId,
    egg: eggId ? eggs.data[eggId] : {},
    flockId: userSettings.data.currentFlockId,
    userId: user ? user.uid : '',
    defaultDate: defaultDate || nowAsMoment().format('YYYY-MM-DD'),
    inProgress: eggs.inProgress,
    error: eggs.error,
  };
};

const mapDispatchToProps = dispatch => ({
  saveForm: (payload) => {
    if (payload.eggId) {
      return dispatch(firebaseUpdateRequested(payload, metaTypes.eggs));
    }
    return dispatch(firebaseCreateRequested(payload, metaTypes.eggs));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EggEditor);
