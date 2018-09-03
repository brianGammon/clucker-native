import React from 'react';
import {
  View,
  Text,
  Button as Btn,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Button } from 'native-base';
import moment from 'moment';
import { Field, FieldGroup, FieldControl } from 'react-reactive-form';
import FormInput from '../FormInput';
import ChickenPhotoPicker from '../ChickenPhotoPicker';
import DatePicker from '../DatePicker';
import { type Navigation } from '../../types';
import styles from './styles';

type Props = {
  navigation: Navigation,
  form: any,
  onRemoveProfilePhoto: () => void,
  onResetProfilePhoto: () => void,
  handleSubmit: () => void,
  onSelectPhoto: (withCamera: boolean) => void,
  error: string,
  originalPhotoUrl: string,
  onDateChange: () => void,
};

const ChickenEditorRenderer = ({
  navigation,
  form,
  onRemoveProfilePhoto,
  onResetProfilePhoto,
  handleSubmit,
  error,
  originalPhotoUrl,
  onSelectPhoto,
  onDateChange,
}: Props) => (
  <ScrollView>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
    >
      <View style={styles.header}>
        <Button onPress={() => navigation.goBack()} title="Cancel" />
      </View>
      <View style={styles.editorContainer}>
        {error && <Text style={styles.error}>{error}</Text>}
        <FieldGroup
          control={form}
          render={({ invalid }) => (
            <View style={styles.formContainer}>
              <FieldControl
                name="name"
                render={FormInput}
                meta={{ label: 'Name', maxLength: 25 }}
              />

              <FieldControl
                name="breed"
                render={FormInput}
                meta={{
                  label: 'Breed',
                  maxLength: 25,
                }}
              />

              <Field
                control={form.get('dateTest')}
                strict={false}
                render={({ value }) => (
                  <DatePicker
                    value={value}
                    onDateChange={onDateChange}
                    clearable
                    maximumDate={new Date(moment().valueOf())}
                  />
                )}
              />

              <Field
                control={form.get('photoUrl')}
                strict={false}
                render={({ value: photoUrl }) => {
                  const { newImage } = form.value;
                  return (
                    <ChickenPhotoPicker
                      photoUrl={photoUrl}
                      newImage={newImage}
                      originalPhotoUrl={originalPhotoUrl}
                      onRemoveProfilePhoto={onRemoveProfilePhoto}
                      onResetProfilePhoto={onResetProfilePhoto}
                      onSelectPhoto={onSelectPhoto}
                    />
                  );
                }}
              />

              <Btn disabled={invalid} onPress={handleSubmit} title="Save" />
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  </ScrollView>
);

export default ChickenEditorRenderer;
