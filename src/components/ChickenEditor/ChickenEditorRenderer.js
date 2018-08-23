import React from 'react';
import {
  View, Text, TextInput, Button, Image,
} from 'react-native';
import styles from './styles';

type Props = {
  name: string,
  breed: string,
  hatched: string,
  photoUrl: string,
  onFieldChanged: (fieldName: string, text: string) => void,
  onRemoveProfilePhoto: () => void,
  onResetProfilePhoto: () => void,
  onSaveForm: () => void,
  onSelectPhoto: (withCamera: boolean) => void,
  error: string,
  originalPhotoUrl: string,
  newImage: any,
};

const ChickenEditorRenderer = ({
  name,
  breed,
  hatched,
  photoUrl,
  onFieldChanged,
  onRemoveProfilePhoto,
  onResetProfilePhoto,
  onSaveForm,
  error,
  originalPhotoUrl,
  onSelectPhoto,
  newImage,
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
      {error && <Text>{error}</Text>}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => onFieldChanged('name', text)}
          autoFocus
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Breed:</Text>
        <TextInput
          style={styles.input}
          value={breed}
          onChangeText={text => onFieldChanged('breed', text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Hatched On:</Text>
        <TextInput
          style={styles.input}
          value={hatched}
          onChangeText={text => onFieldChanged('hatched', text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Profile Photo:</Text>
        <Image style={{ width: 200, height: 200 }} source={imageSource} />
        {photoUrl !== ''
          && !newImage && (
            <Button onPress={onRemoveProfilePhoto} title="Remove Photo" />
        )}
        {((originalPhotoUrl !== '' && photoUrl === '') || newImage) && (
          <Button onPress={onResetProfilePhoto} title="Reset Photo" />
        )}
        <Button onPress={() => onSelectPhoto(false)} title="Select Photo" />
        <Button onPress={() => onSelectPhoto(true)} title="Take Photo" />
      </View>
      <Button onPress={onSaveForm} title="Save" />
    </View>
  );
};

export default ChickenEditorRenderer;
