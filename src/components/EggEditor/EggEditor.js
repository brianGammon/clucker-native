/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FormBuilder, Validators } from 'react-reactive-form';
import EggEditorRenderer from './EggEditorRenderer';
import { nowAsMoment } from '../../utils/dateHelper';
import { type Chicken, type Egg, type Navigation } from '../../types';
import { metaTypes, actionTypes } from '../../redux/constants';
import Loading from '../Loading';
import {
  firebaseUpdateRequested,
  firebaseCreateRequested,
} from '../../redux/actions';
import {
  dateInRangeValidator,
  weightRangeValidator,
} from '../../utils/validators';

type Props = {
  inProgress: boolean,
  error: string,
  chickenId: string,
  chickens: {
    [chickenId: string]: Chicken,
  },
  eggId: string,
  egg: Egg,
  navigation: Navigation,
  defaultDate: string,
  saveForm: (payload: { eggId?: string, data: Egg }) => void,
  clearError: () => void,
};

type State = {
  formReady: boolean,
};

class EggEditor extends React.Component<Props, State> {
  form = FormBuilder.group({
    damaged: [false],
    chickenId: ['', Validators.required],
    date: ['', [Validators.required, dateInRangeValidator]],
    notes: [''],
    weight: [
      '',
      [Validators.pattern(/^\d+([.]\d{0,1})?$/), weightRangeValidator],
    ],
  });

  state = { formReady: false };

  componentDidMount() {
    const { chickenId, defaultDate, egg } = this.props;
    let defaultState = {
      ...this.form.value,
      chickenId: chickenId || '',
      date: defaultDate,
    };

    if (egg) {
      const { modified, ...rest } = egg;
      defaultState = { ...defaultState, ...rest };
    }
    this.form.controls.damaged.setValue(defaultState.damaged);
    this.form.controls.chickenId.setValue(defaultState.chickenId);
    this.form.controls.date.setValue(defaultState.date);
    this.form.controls.notes.setValue(defaultState.notes);
    this.form.controls.weight.setValue(defaultState.weight);
    this.setState({ formReady: true });
  }

  componentDidUpdate(prevProps) {
    const prevInProgress = prevProps.inProgress;
    const { inProgress, error, navigation } = this.props;
    if (!inProgress && prevInProgress && !error) {
      navigation.goBack();
    }
  }

  componentWillUnmount() {
    const { error, clearError } = this.props;
    if (error) {
      clearError();
    }
  }

  onSaveForm = () => {
    const { egg, eggId, saveForm } = this.props;
    const data = {
      ...egg,
      ...this.form.value,
      bulkMode: false,
      modified: moment().toISOString(),
    };
    const payload = { eggId, data };
    saveForm(payload);
  };

  onDateChange = (dateString: string) => {
    this.form.controls.date.setValue(dateString);
  };

  handlePickItem = (itemValue) => {
    const { chickenId: control } = this.form.controls;
    control.setValue(itemValue);
    control.markAsTouched();
  };

  toggleDamaged = (damaged: boolean) => {
    this.form.controls.damaged.setValue(damaged);
  };

  render() {
    const { navigation, chickens, eggId } = this.props;
    const { formReady } = this.state;
    if (!formReady) {
      return <Loading />;
    }
    return (
      <EggEditorRenderer
        mode={eggId ? 'Edit' : 'Add'}
        navigation={navigation}
        chickens={chickens}
        form={this.form}
        handlePickItem={this.handlePickItem}
        toggleDamaged={this.toggleDamaged}
        onSaveForm={this.onSaveForm}
        onDateChange={this.onDateChange}
      />
    );
  }
}

const mapStateToProps = ({ chickens, eggs }, { navigation }) => {
  const chickenId = navigation.getParam('chickenId', null);
  const eggId = navigation.getParam('eggId', null);
  const defaultDate = navigation.getParam('date', null);
  return {
    chickenId,
    chickens: chickens.data,
    eggId,
    egg: eggId ? eggs.data[eggId] : {},
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
  clearError: () => dispatch({ type: actionTypes.CLEAR_ERROR, meta: { type: metaTypes.eggs } }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EggEditor);
