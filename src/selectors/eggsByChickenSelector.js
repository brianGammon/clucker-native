import _ from 'lodash';
import createCachedSelector from 're-reselect';

const getEggsList = state => state;
const getChickenId = (state, chickenId) => chickenId;

const eggsByChickenSelector = createCachedSelector(
  [getEggsList, getChickenId],
  (eggs, chickenId) => {
    // eslint-disable-next-line no-console
    console.log('Running eggs for chicken selector');
    return _.reduce(
      eggs,
      (accumulator, value, key) => {
        if (value.chickenId === chickenId) {
          // eslint-disable-next-line no-param-reassign
          accumulator[key] = value;
        }
        return accumulator;
      },
      {},
    );
  },
)(getChickenId);

export default eggsByChickenSelector;
