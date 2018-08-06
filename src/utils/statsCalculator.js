import moment from 'moment';
import { forEach, sortBy } from 'lodash';
import { dateStringAsMoment, nowAsMoment } from './dateHelper';

export default (eggs) => {
  let heaviestEgg = null;
  let highestWeight = 0;
  let totalWithWeight = 0;
  let totalWeight = 0;
  let earliestDate = null;
  let thirtyDayCount = 0;
  const daysBackForAvg = 30;
  const thirtyDaysAgo = nowAsMoment().subtract(daysBackForAvg - 1, 'day');
  const eggsPerChicken = {};

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
    if (thisEgg.isAfter(thirtyDaysAgo)) {
      thirtyDayCount += 1;
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
  if (earliest.isAfter(thirtyDaysAgo)) {
    const daysAfter = earliest.diff(thirtyDaysAgo, 'days');
    daysToGoBack = daysBackForAvg - daysAfter;
  }
  const averageNumber = thirtyDayCount > 0 ? thirtyDayCount / daysToGoBack : 0;

  return {
    total: eggs.length,
    heaviest: heaviestEgg,
    averageWeight: totalWeight / totalWithWeight,
    averageNumber,
    firstEgg: earliestDate,
    mostEggs: topProducer,
    eggsPerChicken,
  };
};
