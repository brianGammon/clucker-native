import React from 'react';
import ImageViewer from '.';

test('ImageViewer renders properly with image URL', () => {
  const wrapper = shallow(
    <ImageViewer
      showModal
      toggleModal={() => {}}
      url="https://example.com/image.jpg"
    />,
  );
  expect(wrapper).toMatchSnapshot();
});

test('ImageViewer renders properly with no image URL provided', () => {
  const wrapper = shallow(<ImageViewer showModal toggleModal={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('ImageViewer renders properly showModal set to false', () => {
  const wrapper = shallow(
    <ImageViewer
      showModal={false}
      toggleModal={() => {}}
      url="https://example.com/image.jpg"
    />,
  );
  expect(wrapper).toMatchSnapshot();
});
