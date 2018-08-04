import createCachedSelector from 're-reselect';

const getFlocks = flocks => flocks;
const getCurrentFlockId = (flocks, { data: { currentFlockId } }) => currentFlockId;

const currentFlockSelector = createCachedSelector(
  [getFlocks, getCurrentFlockId],
  (flocks, currentFlockId) => {
    console.log('running currentFlockSelector', currentFlockId);
    return flocks[currentFlockId];
  },
)(getCurrentFlockId);

export default currentFlockSelector;
