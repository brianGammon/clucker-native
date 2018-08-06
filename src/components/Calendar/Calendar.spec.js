import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/sampleData';
import mockNavigation from '../../../jest/mockNavigation';
import Calendar from '.';

describe('Calender component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);

  test('Should render', () => {
    const paramReturned = {
      getParam: {
        date: '2018-08',
      },
    };
    const navigation = mockNavigation(paramReturned);
    const wrapper = shallow(
      <Calendar store={store} navigation={navigation} />,
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
