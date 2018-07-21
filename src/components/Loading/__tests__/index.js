import React from 'react';
import Loading from '..';

import renderer from 'react-test-renderer';

describe('Loading tests', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with message', () => {
    const tree = renderer.create(<Loading message="with message" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
