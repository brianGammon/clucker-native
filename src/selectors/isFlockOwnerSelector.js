import createCachedSelector from 're-reselect';
import currentFlockSelector from './currentFlockSelector';

const getCurrentUser = (flocks, userSettings, uid) => uid;

const isFlockOwnerSelector = createCachedSelector(
  [currentFlockSelector, getCurrentUser],
  (flock, userId) => {
    const result = flock ? flock.ownedBy === userId : false;
    console.log('ran isFlockOwner selector: ', result);
    return result;
  },
)(getCurrentUser);

export default isFlockOwnerSelector;
