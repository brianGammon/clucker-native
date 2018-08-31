import React from 'react';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import styles from './styles';

type Props = {
  value: string,
  error: string | null,
  touched: boolean,
  handleAddFlock: () => void,
  handleChangeText: (text: string) => void,
};

const AddFlockRenderer = ({
  value,
  error,
  touched,
  handleAddFlock,
  handleChangeText,
}: Props) => (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.label}>Add Flock</Text>
    <View style={styles.rowContainer}>
      <TextInput
        style={styles.input}
        maxLength={25}
        value={value}
        onChangeText={text => handleChangeText(text)}
      />
      <Button title="Add" onPress={handleAddFlock} />
    </View>
    {error && touched && <Text>{error}</Text>}
  </View>
);

export default AddFlockRenderer;
