/* @flow */
import { type AbstractControl } from 'react-reactive-form';
import { dateStringAsMoment, nowAsMoment } from './dateHelper';

export const dateInRangeValidator = (control: AbstractControl) => {
  if (dateStringAsMoment(control.value).isAfter(nowAsMoment())) {
    return { dateInFuture: true };
  }
  return null;
};

export const weightRangeValidator = (control: AbstractControl) => {
  if (control.value === '') {
    return null;
  }

  const valueInt = +control.value;
  if (valueInt < 10 || valueInt > 110) {
    return { weightRange: true };
  }
  return null;
};
