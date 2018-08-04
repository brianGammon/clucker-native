import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { type Chicken } from '../../types';

type Props = {
  chicken: Chicken,
  chickenId: string,
};

const ChickenEditorRenderer = ({ chicken, chickenId }: Props) => {
  console.log(chicken, chickenId);
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Add or Edit Chicken</Text>
      <Text>Name:</Text>
      <TextInput value={chicken.name} />
      <Text>Breed:</Text>
      <TextInput value={chicken.breed} />
      <Text>Hatched On:</Text>
      <TextInput value={chicken.hatched} />
    </View>
  );
};

export default ChickenEditorRenderer;
