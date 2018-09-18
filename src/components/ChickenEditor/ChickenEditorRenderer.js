import React from 'react';
import {
  Container, Content, View, Text, Form,
} from 'native-base';
import moment from 'moment';
import { Field, FieldGroup, FieldControl } from 'react-reactive-form';
import FormInput from '../FormInput';
import ChickenPhotoPicker from '../ChickenPhotoPicker';
import DatePicker from '../DatePicker';
import Header from '../Header';
import styles from './styles';

type Props = {
  mode: 'Edit' | 'Add',
  form: any,
  onRemoveProfilePhoto: () => void,
  onResetProfilePhoto: () => void,
  handleSubmit: () => void,
  onSelectPhoto: (withCamera: boolean) => void,
  error: string,
  originalPhotoUrl: string,
  onDateChange: () => void,
  inProgress: boolean,
};

const ChickenEditorRenderer = ({
  mode,
  form,
  onRemoveProfilePhoto,
  onResetProfilePhoto,
  handleSubmit,
  error,
  originalPhotoUrl,
  onSelectPhoto,
  onDateChange,
  inProgress,
}: Props) => (
  <FieldGroup
    control={form}
    strict={false}
    render={({ invalid }) => (
      <Container>
        <Header
          title={`${mode} Chicken`}
          cancelButton
          handleSave={handleSubmit}
          saveDisabled={invalid || inProgress}
        />
        <Content>
          <View padder>
            {error && <Text style={styles.error}>{error}</Text>}

            <Form>
              <FieldControl
                name="name"
                render={formProps => <FormInput {...formProps} />}
                meta={{ label: 'Name', maxLength: 25 }}
              />

              <FieldControl
                name="breed"
                render={formProps => <FormInput {...formProps} />}
                meta={{
                  label: 'Breed',
                  maxLength: 25,
                }}
              />

              <Field
                control={form.get('hatched')}
                strict={false}
                render={({ value }) => (
                  <DatePicker
                    label="Hatched On"
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
            </Form>
          </View>
        </Content>
      </Container>
    )}
  />
);

export default ChickenEditorRenderer;
