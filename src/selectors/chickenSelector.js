import createCachedSelector from 're-reselect';

const getChickens = state => state;
const getChickenId = (state, chickenId) => chickenId;

const eggsByChickenSelector = createCachedSelector(
  [getChickens, getChickenId],
  (chickens, chickenId) => {
    console.log('Running chicken Selector');
    const chickenIds = Object.keys(chickens || {});
    const currentChickenIndex = chickenIds.indexOf(chickenId);
    const nextChickenId = currentChickenIndex === chickenIds.length - 1
      ? null
      : chickenIds[currentChickenIndex + 1];
    const prevChickenId = currentChickenIndex === 0 ? null : chickenIds[currentChickenIndex - 1];
    const result = {
      chicken: chickens[chickenId],
      chickenId,
      prevChickenId,
      nextChickenId,
    };
    return result;
  },
)(getChickenId);

export default eggsByChickenSelector;
