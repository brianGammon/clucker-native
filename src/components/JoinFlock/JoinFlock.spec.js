import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/full.2017-10-to-2018-05.json';
import JoinFlock from '.';

describe('JoinFlock component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);
  test('Should render', () => {
    const wrapper = shallow(<JoinFlock store={store} />).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
