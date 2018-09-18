/* @flow */
import React from 'react';
import {
  Button, Container, Content, View, Text, Form,
} from 'native-base';
import moment from 'moment';
import { Field, FieldGroup, FieldControl } from 'react-reactive-form';
import Header from '../Header';
import DatePicker from '../DatePicker';
import FormInput from '../FormInput';
import styles from './styles';

type Props = {
  form: any,
  onSaveForm: () => void,
  onDateChange: (dateString: string) => void,
  error: string,
};

const BulkEditorRenderer = ({
  form,
  onDateChange,
  onSaveForm,
  error,
}: Props) => (
  <Container>
    <Header title="Bulk Entry" cancelButton />
    <Content>
      <View padder>
        {error && <Text style={styles.error}>{error}</Text>}
        <FieldGroup
          control={form}
          render={({ invalid }) => (
            <Form>
              <Field
                control={form.get('date')}
                strict={false}
                render={({ value }) => (
                  <DatePicker
                    label="Date"
                    value={value}
                    onDateChange={onDateChange}
                    maximumDate={new Date(moment().valueOf())}
                  />
                )}
              />

              <FieldControl
                name="quantity"
                render={formProps => <FormInput {...formProps} />}
                meta={{
                  label: 'Quantity',
                  keyboardType: 'number-pad',
                }}
              />

              <FieldControl
                name="notes"
                render={formProps => <FormInput {...formProps} />}
                meta={{
                  label: 'Notes',
                  multiline: true,
                  numberOfLines: 5,
                  maxLength: 250,
                }}
              />

              <Button
                block
                disabled={invalid}
                onPress={onSaveForm}
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

export default BulkEditorRenderer;
