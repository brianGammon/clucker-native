import React from 'react';
import { View, Text, TextInput } from 'react-native';

type Props = {
  name: string,
  breed: string,
  hatched: string,
  onFieldChanged: (fieldName: string, text: string) => void,
};

const ChickenEditorRenderer = ({
  name,
  breed,
  hatched,
  onFieldChanged,
}: Props) => (
  <View style={{ flex: 1, alignItems: 'center' }}>
    <Text>Name:</Text>
    <TextInput
      value={name}
      onChangeText={text => onFieldChanged('name', text)}
    />
    <Text>Breed:</Text>
    <TextInput
      value={breed}
      onChangeText={text => onFieldChanged('breed', text)}
    />
    <Text>Hatched On:</Text>
    <TextInput
      value={hatched}
      onChangeText={text => onFieldChanged('hatched', text)}
    />
  </View>
);

export default ChickenEditorRenderer;
