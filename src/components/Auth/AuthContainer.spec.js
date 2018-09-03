import React from 'react';
import AuthContainer from './AuthContainer';
import AuthExtraLink from './AuthExtraLink';

describe('AuthContainer', () => {
  const link1 = (
    <AuthExtraLink
      key={0}
      message="test"
      buttonText="text"
      handlePress={() => {}}
    />
  );
  const link2 = (
    <AuthExtraLink
      key={1}
      message="test"
      buttonText="text"
      handlePress={() => {}}
    />
  );
  test('renders without extra links and no error', () => {
    const wrapper = shallow(<AuthContainer title="Sign In" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders with extra links and no error', () => {
    const wrapper = shallow(
      <AuthContainer title="Sign In" extraLinks={[link1, link2]} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('renders with empty extra links and error', () => {
    const wrapper = shallow(
      <AuthContainer
        title="Sign In"
        extraLinks={[]}
        error="Test error message"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
