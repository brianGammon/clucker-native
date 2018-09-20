import { forEach } from 'lodash';
import createCachedSelector from 're-reselect';
import { type Egg } from '../types';

const getEggsList = state => state;
const getMonth = (state, month = 'allTime') => month;

const eggCountSelector = createCachedSelector(
  [getEggsList, getMonth],
  (eggs, date) => {
    let count = 0;
    // eslint-disable-next-line no-console
    console.log(`Running egg count selector for range: ${date}`);
    forEach(eggs, (item: Egg) => {
      count += +item.quantity || 1;
    });
    return count;
  },
)(getMonth);

export default eggCountSelector;
