import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/no-flocks.json';
import SignIn from '.';

describe('SignIn component:', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);
  const store = mockStore(sampleData);
  test('Should render', () => {
    const wrapper = shallow(<SignIn store={store} />).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
