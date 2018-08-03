// import { createSelector } from 'reselect';

const chickens = state => state;
const chickenId = (state, { navigation }) => navigation.getParam('chickenId', 'NO-ID');

const eggsByChickenSelector = createSelector(
  [chickens, chickenId],
  (allChickens, id) => ({
    chickens: allChickens,
    chickenId: id,
  }),
);

export default eggsByChickenSelector;
