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
  error: string,
  originalPhotoUrl: string,
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
}: Props) => (
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
      <Image
        style={{ width: 200, height: 200 }}
        source={
          photoUrl
            ? { uri: photoUrl }
            : require('../../assets/default-profile-photo.png')
        }
      />
      {photoUrl !== '' && (
        <Button onPress={onRemoveProfilePhoto} title="Remove Photo" />
      )}
      {originalPhotoUrl !== ''
        && photoUrl === '' && (
          <Button onPress={onResetProfilePhoto} title="Reset Photo" />
      )}
    </View>
    <Button onPress={onSaveForm} title="Save" />
  </View>
);

export default ChickenEditorRenderer;
