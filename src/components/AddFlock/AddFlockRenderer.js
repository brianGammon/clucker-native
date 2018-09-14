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
  <View>
    <CommonLabel text="Create a new flock" />
    <View padder>
      <Text style={styles.helpText}>
        Type in a name for your new flock, then tap Create:
      </Text>
      <Item regular>
        <Input
          maxLength={25}
          value={value}
          placeholder="Enter a flock name"
          onChangeText={text => handleChangeText(text)}
          autoCapitalize="none"
        />

        <Button transparent onPress={handleAddFlock}>
          <Text>Create</Text>
        </Button>
      </Item>
      <View style={styles.errorContainer}>
        {error && touched && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  </View>
);

export default AddFlockRenderer;
