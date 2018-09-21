import { sortBy, forEach } from 'lodash';
import moment from 'moment';
import createCachedSelector from 're-reselect';
import eggsByChickenSelector from './eggsByChickenSelector';
import { nowAsMoment } from '../utils/dateHelper';

const getChickenId = (state, chickenId) => chickenId;

const chickenStatsSelector = createCachedSelector(
  [eggsByChickenSelector, getChickenId],
  (eggs) => {
    // eslint-disable-next-line no-console
    console.log('Running chicken stats selector');
    let heaviest = 0;
    let heaviestEgg = null;
    let streakCount = 0;
    let longestStreak = 0;
    let lastEggDate = null;

    const lastSevenDays = {};
    const startDay = nowAsMoment().subtract(6, 'day');
    lastSevenDays[startDay.format('YYYY-MM-DD')] = 0;
    let daysAdded = 1;
    while (daysAdded < 7) {
      lastSevenDays[startDay.add(1, 'day').format('YYYY-MM-DD')] = 0;
      daysAdded += 1;
    }

    const sortedEggs = sortBy(eggs, 'date');
    forEach(sortedEggs, (egg) => {
      let resetStreak = false;

      // Determine the longest streak
      if (!lastEggDate) {
        // first one, start a streak
        streakCount = 1;
        longestStreak = 1;
        lastEggDate = egg.date;
      } else {
        // see if this egg date is 1 day past
        const thisEgg = moment(egg.date);
        const lastEgg = moment(lastEggDate);
        const daysBetween = thisEgg.diff(lastEgg, 'days');
        // Not counting if daysBetween === 0, means 2 in 1 day
        if (daysBetween === 1) {
          // Still got a streak going
          streakCount += 1;
        } else if (daysBetween > 1) {
          // current streak over
          resetStreak = true;
        }

        if (streakCount > longestStreak) {
          longestStreak = streakCount;
        }

        if (resetStreak) {
          streakCount = 1;
          resetStreak = false;
        }

        lastEggDate = egg.date;
      }

      // Figure out the heaviest
      if (egg.weight && +egg.weight >= heaviest) {
        heaviest = +egg.weight;
        heaviestEgg = egg;
      }

      // Track the past 7 days eggs
      if (Object.prototype.hasOwnProperty.call(lastSevenDays, egg.date)) {
        lastSevenDays[egg.date] += 1;
      }
    });

    const stats = {};
    stats.total = sortedEggs.length;
    stats.heaviest = heaviestEgg;
    stats.longestStreak = longestStreak;
    stats.lastSevenDays = lastSevenDays;
    stats.lastEgg = lastEggDate;
    return stats;
  },
)(getChickenId);

export default chickenStatsSelector;
