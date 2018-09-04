import React from 'react';
import {
  Button,
  Container,
  Content,
  View,
  Text,
  Header,
  Left,
  Body,
  Right,
  Form,
} from 'native-base';
import moment from 'moment';
import { Field, FieldGroup, FieldControl } from 'react-reactive-form';
import FormInput from '../FormInput';
import ChickenPhotoPicker from '../ChickenPhotoPicker';
import DatePicker from '../DatePicker';
import { type Navigation } from '../../types';
import styles from './styles';

type Props = {
  mode: 'Edit' | 'Add',
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
  mode,
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
  <Container>
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </Button>
      </Left>
      <Body>
        <Text>{`${mode} Chicken`}</Text>
      </Body>
      <Right />
    </Header>
    <Content>
      <View padder>
        {error && <Text style={styles.error}>{error}</Text>}
        <FieldGroup
          control={form}
          render={({ invalid }) => (
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

              <Button
                block
                disabled={invalid}
                onPress={handleSubmit}
                style={styles.submit}
              >
                <Text>Save</Text>
              </Button>
            </Form>
          )}
        />
      </View>
    </Content>
  </Container>
);

export default ChickenEditorRenderer;
