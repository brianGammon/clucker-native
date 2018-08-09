import moment from 'moment';
import { forEach, sortBy } from 'lodash';
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
  const thirtyDaysAgo = now;
  const firstOfMonth = range === 'allTime' ? null : moment.utc(`${range}-01`);
  const startofRange = range === 'allTime' ? thirtyDaysAgo : firstOfMonth;
  const eggsPerChicken = {};
  const eggsPerDay = {};

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
    const thisEgg = moment(egg.date);

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
    // Build a running total for the past 30 days
    if (thisEgg.isAfter(startofRange)) {
      rangeCount += 1;

      if (!eggsPerDay[egg.date]) {
        eggsPerDay[egg.date] = { total: 0, byChicken: {} };
      }

      eggsPerDay[egg.date].total += 1;
      eggsPerDay[egg.date].byChicken[egg.chickenId] = eggsPerDay[egg.date].byChicken[egg.chickenId] || 0 + 1;
    }
  });

  // Figure out who laid the most eggs
  let topProducer = '';
  let most = 0;
  forEach(Object.keys(eggsPerChicken), (key) => {
    if (eggsPerChicken[key] > most) {
      topProducer = key;
      most = eggsPerChicken[key];
    }
  });

  const earliest = dateStringAsMoment(earliestDate);
  let daysToGoBack = daysBackForAvg;

  if (range === 'allTime' && earliest.isAfter(startofRange)) {
    const daysAfter = earliest.diff(startofRange, 'days');
    daysToGoBack = daysBackForAvg - daysAfter;
  }
  const averageNumber = rangeCount > 0 ? rangeCount / daysToGoBack : 0;

  const stats = {
    total: sortedEggs.length,
    heaviest: heaviestEgg,
    averageWeight: totalWeight / totalWithWeight,
    averageNumber,
    firstEgg: earliestDate,
    mostEggs: topProducer,
    eggsPerChicken,
    eggsPerDay,
  };
  return stats;
};