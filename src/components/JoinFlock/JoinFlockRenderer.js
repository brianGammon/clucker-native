/* @flow */
import React from 'react';
import {
  View, Text, Button, Input, Item,
} from 'native-base';
import CommonLabel from '../CommonLabel';
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
  <View>
    <CommonLabel text="Join an existing flock" />
    <View padder>
      <Text style={styles.helpText}>
        Type or paste a shared flock key, then tap Join:
      </Text>
      <Item>
        <Input
          value={value}
          placeholder="Enter a flock key"
          onChangeText={text => handleChangeText(text)}
          autoCapitalize="none"
        />
        <Button transparent onPress={handleJoinFlock}>
          <Text>Join</Text>
        </Button>
      </Item>
      <View style={styles.errorContainer}>
        {error && touched && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  </View>
);

export default JoinFlockRenderer;
