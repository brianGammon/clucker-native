/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FormBuilder, Validators } from 'react-reactive-form';
import BulkEditorRenderer from './BulkEditorRenderer';
import { nowAsMoment } from '../../utils/dateHelper';
import { type Egg, type Navigation } from '../../types';
import { metaTypes, actionTypes } from '../../redux/constants';
import Loading from '../Loading';
import {
  firebaseUpdateRequested,
  firebaseCreateRequested,
} from '../../redux/actions';
import { dateInRangeValidator } from '../../utils/validators';

type Props = {
  inProgress: boolean,
  error: string,
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

class BulkEditor extends React.Component<Props, State> {
  form = FormBuilder.group({
    date: ['', [Validators.required, dateInRangeValidator]],
    notes: [''],
    quantity: [
      '',
      [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
    ],
  });

  state = { formReady: false };

  componentDidMount() {
    const { defaultDate, egg } = this.props;
    let defaultState = {
      ...this.form.value,
      date: defaultDate,
    };

    if (egg) {
      const { modified, ...rest } = egg;
      defaultState = { ...defaultState, ...rest };
    }
    this.form.controls.date.setValue(defaultState.date);
    this.form.controls.notes.setValue(defaultState.notes);
    this.form.controls.quantity.setValue(defaultState.quantity);
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
      chickenId: 'unknown',
      bulkMode: true,
      modified: moment().toISOString(),
    };
    const payload = { eggId, data };
    saveForm(payload);
  };

  onDateChange = (dateString: string) => {
    this.form.controls.date.setValue(dateString);
  };

  render() {
    const { navigation, error } = this.props;
    const { formReady } = this.state;
    if (!formReady) {
      return <Loading />;
    }
    return (
      <BulkEditorRenderer
        navigation={navigation}
        form={this.form}
        onSaveForm={this.onSaveForm}
        error={error}
        onDateChange={this.onDateChange}
      />
    );
  }
}

const mapStateToProps = ({ eggs }, { navigation }) => {
  const eggId = navigation.getParam('eggId', null);
  const defaultDate = navigation.getParam('date', null);
  return {
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
)(BulkEditor);
