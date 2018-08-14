import React from 'react';
import {
  Text, View, Button, TextInput,
} from 'react-native';
import styles from './styles';

type Props = {
  flockId: string,
  error: string,
  handleJoinFlock: () => void,
  handleChangeText: (text: string) => void,
};

const JoinFlockRenderer = ({
  flockId,
  error,
  handleJoinFlock,
  handleChangeText,
}: Props) => (
  <View style={{ marginTop: 20 }}>
    <Text style={styles.label}>Join Flock</Text>
    <View style={styles.rowContainer}>
      <TextInput
        style={styles.input}
        value={flockId}
        onChangeText={text => handleChangeText('joinForm', text)}
      />
      <Button title="Join" onPress={handleJoinFlock} />
    </View>
    {error !== '' && <Text>{error}</Text>}
  </View>
);

export default JoinFlockRenderer;
