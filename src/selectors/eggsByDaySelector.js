import { reduce } from 'lodash';
import { createSelector } from 'reselect';

const getEggsList = state => state;
const getDate = (state, date) => date;

const eggsByDaySelector = createSelector(
  [getEggsList, getDate],
  (eggs, date) => {
    // eslint-disable-next-line no-console
    console.log('Running eggs for date selector');
    return reduce(
      eggs,
      (accumulator, value, key) => {
        if (value.date === date) {
          // eslint-disable-next-line no-param-reassign
          accumulator[key] = value;
        }
        return accumulator;
      },
      {},
    );
  },
);

export default eggsByDaySelector;