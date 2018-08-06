import React from 'react';
import {
  View, Text, TextInput, Button,
} from 'react-native';
import styles from './styles';

type Props = {
  name: string,
  breed: string,
  hatched: string,
  onFieldChanged: (fieldName: string, text: string) => void,
  onSaveForm: () => void,
};

const ChickenEditorRenderer = ({
  name,
  breed,
  hatched,
  onFieldChanged,
  onSaveForm,
}: Props) => (
  <View style={styles.container}>
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
    <Button onPress={onSaveForm} title="Save" />
  </View>
);

export default ChickenEditorRenderer;
