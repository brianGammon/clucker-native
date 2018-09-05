/* @flow */
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
  CheckBox,
  Picker,
  Label,
  Item,
  Icon,
  Title,
} from 'native-base';
import moment from 'moment';
import { Field, FieldGroup, FieldControl } from 'react-reactive-form';
import DatePicker from '../DatePicker';
import { type Navigation, type Chicken } from '../../types';
import FormInput from '../FormInput';
import styles from './styles';

type Props = {
  mode: 'Edit' | 'Add',
  navigation: Navigation,
  form: any,
  chickens: {
    [string]: Chicken,
  },
  handlePickItem: (itemValue: string) => void,
  toggleDamaged: (damaged: boolean) => void,
  onSaveForm: () => void,
  onDateChange: (dateString: string) => void,
  error: string,
};

const EggEditorRenderer = ({
  mode,
  navigation,
  form,
  chickens,
  handlePickItem,
  onDateChange,
  toggleDamaged,
  onSaveForm,
  error,
}: Props) => (
  <Container>
    <Header>
      <Left />
      <Body>
        <Title>{`${mode} Egg`}</Title>
      </Body>
      <Right>
        <Button transparent onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </Button>
      </Right>
    </Header>
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

              <Field
                control={form.get('chickenId')}
                render={({ value: chickenId, errors, touched }) => (
                  <View style={styles.pickerContainer}>
                    <Item inlineLabel error={touched && errors !== null}>
                      <Label style={styles.label}>Chicken:</Label>
                      <View style={{ flex: 1 }}>
                        <Picker
                          note
                          mode="dropdown"
                          textStyle={
                            chickenId !== '' ? styles.pickerText : null
                          }
                          selectedValue={chickenId || ''}
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
                      {touched && errors && <Icon name="alert" />}
                    </Item>
                    {errors
                      && touched && (
                        <Text style={styles.error}>
                          Select a chicken or &quot;I&apos;m not sure&quot;
                        </Text>
                    )}
                  </View>
                )}
              />

              <FieldControl
                name="weight"
                render={formProps => <FormInput {...formProps} />}
                meta={{
                  label: 'Weight (g)',
                  keyboardType: 'decimal-pad',
                }}
              />

              <FieldControl
                name="damaged"
                render={({ value }) => (
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      onPress={() => toggleDamaged(!value)}
                      checked={value}
                    />
                    <Text style={styles.checkboxLabel}>
                      Egg was damaged or broken
                    </Text>
                  </View>
                )}
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

export default EggEditorRenderer;
