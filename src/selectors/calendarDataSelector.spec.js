import calendarDataSelector from './calendarDataSelector';
import sampleData from '../../jest/test-data/full.2017-10-to-2018-05.json';

test('calendar range tests', () => {
  const month = '2018-04';
  const calendarData = calendarDataSelector(sampleData.eggs.data, month);
  expect(calendarData).toMatchSnapshot();
});
