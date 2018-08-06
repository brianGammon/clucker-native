import { reduce } from 'lodash';
import createCachedSelector from 're-reselect';

const eggsList = state => state;
const monthSelector = (state, month = 'all') => month;

const eggsSelector = createCachedSelector(
  [eggsList, monthSelector],
  (eggs, date) => {
    // eslint-disable-next-line no-console
    console.log(`Running eggs selector for range: ${date}`);
    const eggsForRange = reduce(
      eggs,
      (accumulator, value, key) => {
        if (value.date.startsWith(date)) {
          // eslint-disable-next-line no-param-reassign
          accumulator[key] = value;
        }
        return accumulator;
      },
      {},
    );

    // returns a lost of eggs sorted by the month requests, or all
    return eggsForRange;
  },
)(monthSelector);

export default eggsSelector;
