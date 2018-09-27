/* @flow */
import React from 'react';
import { View, Button, Text } from 'native-base';
import { Image } from 'react-native';
import CommonLabel from '../CommonLabel';
import styles from './styles';

type Props = {
  photoUrl: string,
  newImage: {
    mime: string,
    data: string,
  } | null,
  originalPhotoUrl: string,
  onRemoveProfilePhoto: () => void,
  onResetProfilePhoto: () => void,
  onSelectPhoto: (withCamera: boolean) => void,
};

const ChickenPhotoPicker = ({
  photoUrl,
  newImage,
  originalPhotoUrl,
  onRemoveProfilePhoto,
  onResetProfilePhoto,
  onSelectPhoto,
}: Props) => {
  let imageSource = require('../../assets/default-profile-photo.png');
  if (photoUrl !== '') {
    imageSource = { uri: photoUrl };
  }
  if (newImage) {
    imageSource = {
      uri: `data:${newImage.mime};base64,${newImage.data}`,
    };
  }
  return (
    <View style={styles.container}>
      <CommonLabel text="Profile Photo:" />
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ width: 180, height: 180 }} source={imageSource} />
        <View style={styles.photoControls}>
          {photoUrl !== ''
            && !newImage && (
              <Button transparent onPress={onRemoveProfilePhoto}>
                <Text>Remove</Text>
              </Button>
          )}
          {((originalPhotoUrl !== '' && photoUrl === '') || newImage) && (
            <Button transparent onPress={onResetProfilePhoto}>
              <Text>Reset</Text>
            </Button>
          )}
          <Button transparent onPress={() => onSelectPhoto(false)}>
            <Text>Select Photo</Text>
          </Button>
          <Button transparent onPress={() => onSelectPhoto(true)}>
            <Text>Take Photo</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ChickenPhotoPicker;
