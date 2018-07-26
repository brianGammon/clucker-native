import React from 'react';
import Loading from '.';

describe('HeaderProfile component:', () => {
  test('Should render without message', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Should render with message', () => {
    const wrapper = shallow(<Loading message="Test message" />);
    expect(wrapper).toMatchSnapshot();
  });
});
