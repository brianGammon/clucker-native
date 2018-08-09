import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/full.2017-10-to-2018-05.json';
import mockNavigation from '../../../jest/mockNavigation';
import CalendarDay from '.';

describe('CalendarDay component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);

  test('Should render correctly', () => {
    const returnValues = { getParam: { date: '2018-05-09' } };
    const navigation = mockNavigation(returnValues);
    const wrapper = shallow(
      <CalendarDay store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
