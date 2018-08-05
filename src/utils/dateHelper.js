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
