/* @flow */
import React from 'react';
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Switch,
  Picker,
} from 'react-native';
import { Field, FieldGroup, FieldControl } from 'react-reactive-form';
import { type Navigation, type Chicken } from '../../types';
import FormInput from '../FormInput';
import styles from './styles';

type Props = {
  navigation: Navigation,
  form: any,
  chickens: {
    [string]: Chicken,
  },
  handlePickItem: (itemValue: string) => void,
  onSaveForm: () => void,
  error: string,
};

const EggEditorRenderer = ({
  navigation,
  form,
  chickens,
  handlePickItem,
  onSaveForm,
  error,
}: Props) => (
  <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <View style={styles.editorContainer}>
      {error && <Text style={styles.error}>{error}</Text>}

      <FieldGroup
        control={form}
        render={({ invalid }) => (
          <View style={styles.formContainer}>
            <FieldControl
              name="date"
              render={FormInput}
              meta={{ label: 'Date' }}
            />

            <Field
              control={form.get('chickenId')}
              render={({ value: chickenId, errors, touched }) => (
                <View style={{ width: '90%' }}>
                  <Text style={styles.label}>Chicken:</Text>
                  {errors
                    && touched && (
                      <Text style={styles.error}>
                        Select a chicken or &quot;I&apos;m not sure&quot;
                      </Text>
                  )}
                  <Picker
                    selectedValue={chickenId || ''}
                    style={{ borderWidth: 1 }}
                    onValueChange={handlePickItem}
                  >
                    <Picker.Item label="Select a chicken" value="" />
                    <Picker.Item label="I'm not sure" value="unknown" />
                    {Object.keys(chickens || {}).map(key => (
                      <Picker.Item
                        key={key}
                        label={chickens[key].name}
                        value={key}
                      />
                    ))}
                  </Picker>
                </View>
              )}
            />

            <FieldControl
              name="weight"
              render={FormInput}
              meta={{
                label: 'Weight',
                keyboardType: 'decimal-pad',
              }}
            />

            <FieldControl
              name="damaged"
              render={({ handler }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Switch
                    style={{ marginRight: 10, tintColor: 'grey' }}
                    {...handler('switch')}
                  />
                  <Text>This egg was damaged</Text>
                </View>
              )}
            />

            <FieldControl
              name="notes"
              render={FormInput}
              meta={{
                label: 'Notes',
                multiline: true,
                // numberOfLines: 4,
                maxLength: 250,
              }}
            />

            <Button disabled={invalid} onPress={onSaveForm} title="Save" />
            <Button onPress={() => navigation.goBack()} title="Cancel" />
          </View>
        )}
      />
    </View>
  </KeyboardAvoidingView>
);

export default EggEditorRenderer;
