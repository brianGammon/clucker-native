import React from 'react';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import styles from './styles';

type Props = {
  name: string,
  error: string,
  handleAddFlock: () => void,
  handleChangeText: (text: string) => void,
};

const AddFlockRenderer = ({
  name,
  error,
  handleAddFlock,
  handleChangeText,
}: Props) => (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.label}>Add Flock</Text>
    <View style={styles.rowContainer}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => handleChangeText(text)}
      />
      <Button title="Add" onPress={handleAddFlock} />
    </View>
    {error && <Text>{error}</Text>}
  </View>
);

export default AddFlockRenderer;
