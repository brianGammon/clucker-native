/* @flow */
import React from 'react';
import {
  Container, Content, View, Form,
} from 'native-base';
import moment from 'moment';
import { Field, FieldGroup, FieldControl } from 'react-reactive-form';
import Header from '../Header';
import DatePicker from '../DatePicker';
import FormInput from '../FormInput';

type Props = {
  form: any,
  onSaveForm: () => void,
  onDateChange: (dateString: string) => void,
};

const BulkEditorRenderer = ({ form, onDateChange, onSaveForm }: Props) => (
  <FieldGroup
    control={form}
    render={({ invalid }) => (
      <Container>
        <Header
          title="Bulk Entry"
          cancelButton
          handleSave={onSaveForm}
          saveDisabled={invalid}
        />
        <Content>
          <View padder>
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
            </Form>
          </View>
        </Content>
      </Container>
    )}
  />
);

export default BulkEditorRenderer;
