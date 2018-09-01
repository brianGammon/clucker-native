import React from 'react';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import styles from './styles';

type Props = {
  value: string,
  error: string | null,
  touched: boolean,
  handleJoinFlock: () => void,
  handleChangeText: (text: string) => void,
};

const JoinFlockRenderer = ({
  value,
  error,
  touched,
  handleJoinFlock,
  handleChangeText,
}: Props) => (
  <View style={{ marginTop: 20, marginBottom: 30 }}>
    <Text style={styles.label}>Join Flock</Text>
    <View style={styles.rowContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => handleChangeText(text)}
      />
      <Button title="Join" onPress={handleJoinFlock} />
    </View>
    {error && touched && <Text>{error}</Text>}
  </View>
);

export default JoinFlockRenderer;
