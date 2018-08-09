import moment from 'moment';

export const nowAsMoment = () => moment()
  .set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  })
  .utcOffset(0, true);

export const dateStringAsMoment = dateString => moment(dateString).utcOffset(0, true);

export const dateSwitcher = (date, unit, format) => {
  const currDate = moment.utc(date);
  const previousDate = currDate
    .subtract(1, unit)
    .format(format)
    .toString();
  let nextDate = currDate
    .add(2, unit)
    .format(format)
    .toString();
  if (dateStringAsMoment(nextDate).isAfter(nowAsMoment())) {
    nextDate = null;
  }
  return {
    previousDate,
    nextDate,
  };
};
