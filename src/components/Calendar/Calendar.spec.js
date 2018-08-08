import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/full.2017-10-to-2018-05.json';
import mockNavigation from '../../../jest/mockNavigation';
import Calendar from '.';
import '../../../jest/mockDateHelper';

describe('Calender component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);

  test('Should render', () => {
    const paramReturned = {
      getParam: {
        date: '2018-05',
      },
    };
    const navigation = mockNavigation(paramReturned);
    const wrapper = shallow(
      <Calendar store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
