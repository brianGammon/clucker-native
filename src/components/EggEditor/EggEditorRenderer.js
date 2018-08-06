/* @flow */
import React from 'react';
import {
  Text, TextInput, View, Button, Switch, Picker,
} from 'react-native';
import { type Navigation, type Chicken } from '../../types';
import styles from './styles';

type Props = {
  navigation: Navigation,
  damaged: boolean,
  chickenId: string,
  date: string,
  notes: string,
  weight: string | number,
  chickens: {
    [string]: Chicken,
  },
  onFieldChanged: (field: string, value: string) => void,
  handleToggleSwitch: (state: boolean) => void,
  handlePickItem: (itemValue: string) => void,
  onSaveForm: () => void,
};

const EggEditorRenderer = ({
  navigation,
  damaged,
  chickenId,
  date,
  notes,
  weight,
  chickens,
  onFieldChanged,
  handleToggleSwitch,
  handlePickItem,
  onSaveForm,
}: Props) => (
  <View style={styles.container}>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={text => onFieldChanged('date', text)}
        autoFocus
      />
    </View>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Chicken:</Text>
      <Picker
        selectedValue={chickenId || 'unknown'}
        style={{ borderWidth: 1 }}
        onValueChange={handlePickItem}
      >
        <Picker.Item label="I'm not sure" value="unknown" />
        {Object.keys(chickens || {}).map(key => (
          <Picker.Item key={key} label={chickens[key].name} value={key} />
        ))}
      </Picker>
    </View>

    <View style={styles.formGroup}>
      <Text style={styles.label}>Chicken:</Text>
      <TextInput
        style={styles.input}
        value={chickenId}
        onChangeText={text => onFieldChanged('chickenId', text)}
      />
    </View>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Weight:</Text>
      <TextInput
        style={styles.input}
        value={weight.toString()}
        onChangeText={text => onFieldChanged('weight', text)}
      />
    </View>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Damaged?:</Text>
      <Switch value={damaged} onValueChange={handleToggleSwitch} />
    </View>
    <View style={styles.formGroup}>
      <Text style={styles.label}>Notes:</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={text => onFieldChanged('notes', text)}
      />
    </View>
    <Button onPress={onSaveForm} title="Save" />
    <Button onPress={() => navigation.goBack()} title="Cancel" />
  </View>
);

export default EggEditorRenderer;
