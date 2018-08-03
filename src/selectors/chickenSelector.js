import { createSelector } from 'reselect';

const getChickens = state => state;
const getChickenId = (state, { navigation }) => navigation.getParam('chickenId', 'NO-ID');

const eggsByChickenSelector = createSelector(
  [getChickens, getChickenId],
  (chickens, chickenId) => {
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
    console.log(result);
    return result;
  },
);

export default eggsByChickenSelector;
