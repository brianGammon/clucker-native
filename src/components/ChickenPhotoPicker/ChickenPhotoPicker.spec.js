import React from 'react';
import ChickenPhotoPicker from '.';

const props = {
  photoUrl: '',
  newImage: null,
  originalPhotoUrl: '',
  onRemoveProfilePhoto: () => {},
  onResetProfilePhoto: () => {},
  onSelectPhoto: () => {},
};

test('ChickenPhotoPicker renders when no previous photo and no new photo selected', () => {
  const wrapper = shallow(<ChickenPhotoPicker {...props} />);
  expect(wrapper).toMatchSnapshot();
});

test('ChickenPhotoPicker renders when existing photo was removed', () => {
  const wrapper = shallow(
    <ChickenPhotoPicker {...{ ...props, originalPhotoUrl: '/test' }} />,
  );
  expect(wrapper).toMatchSnapshot();
});

test('ChickenPhotoPicker renders when original photo exists, new photo selected', () => {
  const wrapper = shallow(
    <ChickenPhotoPicker
      {...{
        ...props,
        photoUrl: '/test',
        newImage: { mime: 'jpeg', data: 'testdata' },
      }}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});

test('ChickenPhotoPicker renders when originalPhotoUrl exists, and new image not selected', () => {
  const wrapper = shallow(
    <ChickenPhotoPicker
      {...{
        ...props,
        photoUrl: '/test',
        originalPhotoUrl: '/test',
      }}
    />,
  );
  expect(wrapper).toMatchSnapshot();
});
