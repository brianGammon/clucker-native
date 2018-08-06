import createCachedSelector from 're-reselect';
import eggsByRangeSelector from './eggsByRangeSelector';
import statsCalculator from '../utils/statsCalculator';

const monthSelector = (state, month = 'all') => month;

const flockStatsSelector = createCachedSelector(
  [eggsByRangeSelector, monthSelector],
  (eggs, date) => {
    // eslint-disable-next-line no-console
    console.log(`Running stats selector for range: ${date}`);
    const stats = statsCalculator(eggs);
    return stats;
  },
)(monthSelector);

export default flockStatsSelector;
