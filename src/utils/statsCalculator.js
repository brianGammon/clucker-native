import moment from 'moment';
import { sortBy, toPairs, fromPairs } from 'lodash';
import { dateStringAsMoment, nowAsMoment } from './dateHelper';

export default (eggs, range) => {
  let heaviestEgg = null;
  let highestWeight = 0;
  let totalWithWeight = 0;
  let totalWeight = 0;
  let earliestDate = null;
  let rangeCount = 0;
  let daysBackForAvg = 30;
  const now = nowAsMoment();
  const thirtyDaysAgo = now.clone().subtract(daysBackForAvg - 1, 'day');
  const firstOfMonth = range === 'allTime' ? null : moment.utc(`${range}-01`);
  const startofRange = range === 'allTime' ? thirtyDaysAgo : firstOfMonth;
  let eggsPerChicken = {};
  const eggsPerPeriod = {};

  if (range !== 'allTime') {
    if (now.format('YYYY-MM') === range) {
      // in current month, use number of days so far in month
      daysBackForAvg = now.diff(firstOfMonth, 'days') + 1;
    } else {
      // not current month, so use number of days in month
      daysBackForAvg = moment(range).daysInMonth();
    }
  }

  const sortedEggs = sortBy(eggs, 'date');
  if (sortedEggs.length === 0) {
    return null;
  }

  sortedEggs.forEach((egg) => {
    const thisEggDate = moment(egg.date);

    if (!earliestDate) {
      earliestDate = egg.date;
    }

    if (!eggsPerChicken[egg.chickenId]) {
      eggsPerChicken[egg.chickenId] = 0;
    }
    eggsPerChicken[egg.chickenId] += 1;

    // Find heaviest & avg
    if (egg.weight) {
      totalWithWeight += 1;
      // Some weights are stored as strings (TODO)
      totalWeight += +egg.weight;
      if (+egg.weight > highestWeight) {
        heaviestEgg = egg;
        highestWeight = egg.weight;
      }
    }

    if (range === 'allTime' || thisEggDate.isAfter(startofRange)) {
      rangeCount += 1;
      const rollupPeriod = range === 'allTime' ? egg.date.substring(0, 7) : egg.date;

      if (!eggsPerPeriod[rollupPeriod]) {
        eggsPerPeriod[rollupPeriod] = { total: 0, byChicken: {} };
      }

      eggsPerPeriod[rollupPeriod].total += 1;
      eggsPerPeriod[rollupPeriod].byChicken[egg.chickenId] = (eggsPerPeriod[rollupPeriod].byChicken[egg.chickenId] || 0) + 1;
    }
  });

  const earliest = dateStringAsMoment(earliestDate);
  let daysToGoBack = daysBackForAvg;

  if (range === 'allTime' && earliest.isAfter(startofRange)) {
    const daysAfter = earliest.diff(startofRange, 'days');
    daysToGoBack = daysBackForAvg - daysAfter;
  }
  const averageNumber = rangeCount > 0 ? rangeCount / daysToGoBack : 0;

  // sort the eggPerPeriod by most eggs
  const array = toPairs(eggsPerChicken);
  const sortedArray = array.sort((a, b) => b[1] - a[1]);
  const topProducer = sortedArray[0][0];
  eggsPerChicken = fromPairs(sortedArray);

  const stats = {
    total: sortedEggs.length,
    heaviest: heaviestEgg,
    averageWeight: totalWeight / totalWithWeight,
    averageNumber,
    firstEgg: earliestDate,
    mostEggs: topProducer,
    eggsPerChicken,
    eggsPerPeriod,
  };
  return stats;
};
