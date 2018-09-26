import React from 'react';
import configureStore from 'redux-mock-store';
import sampleData from '../../../jest/test-data/full.2017-10-to-2018-05.json';
import ErrorHandler from '.';
import ErrorHandlerRenderer from './ErrorHandleRenderer';

describe('ErrorHandler', () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  test('Connected component renders with error message', () => {
    const store = mockStore({
      ...sampleData,
      chickens: { ...sampleData.chickens, error: 'Some error occurred' },
    });
    const wrapper = shallow(<ErrorHandler store={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Renderer component renders', () => {
    const wrapper = shallow(
      <ErrorHandlerRenderer
        error="Test Error Message"
        uid="user1"
        startListening={() => {}}
        clearErrors={() => {}}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
