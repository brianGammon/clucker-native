import React from 'react';
import {
  Container, Content, View, Text, Form,
} from 'native-base';
import { Field, FieldGroup, FieldControl } from 'react-reactive-form';
import FormInput from '../FormInput';
import ChickenPhotoPicker from '../ChickenPhotoPicker';
import DatePicker from '../DatePicker';
import Header from '../Header';
import styles from './styles';
import { nowAsMoment } from '../../utils/dateHelper';

type Props = {
  mode: 'Edit' | 'Add',
  inputRefs: {
    [id: string]: any,
  },
  focusNext: (field: string) => void,
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
  inputRefs,
  focusNext,
}: Props) => (
  <FieldGroup
    control={form}
    strict={false}
    render={({ invalid }) => {
      const now = nowAsMoment();
      const minDate = now.clone().subtract(20, 'years');
      return (
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
                  meta={{
                    label: 'Name',
                    maxLength: 25,
                    inputRefs,
                    onSubmitEditing: () => focusNext('Breed'),
                    returnKeyType: 'next',
                    blurOnSubmit: false,
                  }}
                />

                <FieldControl
                  name="breed"
                  render={formProps => <FormInput {...formProps} />}
                  meta={{
                    label: 'Breed',
                    maxLength: 25,
                    inputRefs,
                    returnKeyType: 'done',
                    blurOnSubmit: true,
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
                      minimumDate={new Date(minDate.valueOf())}
                      maximumDate={new Date(now.valueOf())}
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
      );
    }}
  />
);

export default ChickenEditorRenderer;
