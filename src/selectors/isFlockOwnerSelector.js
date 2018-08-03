import { createSelector } from 'reselect';
import currentFlockSelector from './currentFlockSelector';

const currentUserSelector = (flocks, { key }) => key;

const isFlockOwnerSelector = createSelector(
  [currentFlockSelector, currentUserSelector],
  (flock, id) => {
    console.log('running isFlockOwner selector');
    return flock ? flock.ownedBy === id : false;
  },
);

export default isFlockOwnerSelector;
