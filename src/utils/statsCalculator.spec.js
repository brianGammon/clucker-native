import statsCalculator from './statsCalculator';
import sampleData from '../../jest/test-data/full.2018-04-to-2018-05';
import sampleData2 from '../../jest/test-data/eggs.only-bulk';
import '../../jest/mockDateHelper';

describe('Stats Calculator', () => {
  test('calculate for allTime, full set', () => {
    const stats = statsCalculator(sampleData.eggs.data, 'allTime');
    expect(stats).toMatchSnapshot();
  });

  test('calculate for allTime, only bulk', () => {
    const stats = statsCalculator(sampleData2.eggs.data, 'allTime');
    expect(stats).toMatchSnapshot();
  });
});
