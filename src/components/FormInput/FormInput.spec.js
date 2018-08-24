import React from 'react';
import FormInput from '.';

const props = {
  handler: () => {},
  touched: false,
  errors: {
    required: true,
    email: true,
  },
  meta: {
    autoCapitalize: 'none',
    mustMatchLabel: 'otherField',
    label: 'thisField',
    secureTextEntry: true,
  },
};

test('FormInput renders - error, not touched yet', () => {
  const wrapper = shallow(<FormInput {...props} />);
  expect(wrapper).toMatchSnapshot();
});

test('FormInput renders - errors, touched', () => {
  const theseProps = { ...props, touched: true };
  const wrapper = shallow(<FormInput {...theseProps} />);
  expect(wrapper).toMatchSnapshot();
});
