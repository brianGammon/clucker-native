import { reduce } from 'lodash';
import createCachedSelector from 're-reselect';

const getEggsList = state => state;
const getMonth = (state, month = 'allTime') => month;

const eggsSelector = createCachedSelector(
  [getEggsList, getMonth],
  (eggs, date) => {
    // eslint-disable-next-line no-console
    console.log(`Running eggs selector for range: ${date}`);
    if (date === 'allTime') {
      return eggs;
    }
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

    return eggsForRange;
  },
)(getMonth);

export default eggsSelector;
