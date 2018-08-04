import createCachedSelector from 're-reselect';
import currentFlockSelector from './currentFlockSelector';

const currentUserSelector = (flocks, { key }) => key;

const isFlockOwnerSelector = createCachedSelector(
  [currentFlockSelector, currentUserSelector],
  (flock, userId) => {
    const result = flock ? flock.ownedBy === userId : false;
    console.log('ran isFlockOwner selector: ', result);
    return result;
  },
)(currentUserSelector);

export default isFlockOwnerSelector;
