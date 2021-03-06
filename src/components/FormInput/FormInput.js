/* @flow */
import React from 'react';
import {
  View, Input, Item, Icon, Text, Button, Textarea,
} from 'native-base';
import errorMapper from '../../utils/errorMapper';
import CommonLabel from '../CommonLabel';
import styles from './styles';

type Props = {
  handler: () => void,
  touched: boolean,
  errors: {
    [errorKey: string]: any,
  } | null,
  meta: {
    autoCapitalize: 'none' | 'sentences' | 'words' | 'characters',
    label: string,
    secureTextEntry: boolean,
    multiline: boolean,
    maxLength: number,
    numberOfLines: number,
    keyboardType: any,
    returnKeyType: string,
    blurOnSubmit: boolean,
    onSubmitEditing: () => {},
    inputRefs: {
      [id: string]: any,
    },
  },
};

type State = {
  hidePassword: boolean,
};

class FormInput extends React.Component<Props, State> {
  state = { hidePassword: true };

  toggleMask = (hidePassword: boolean) => {
    this.setState({ hidePassword });
  };

  render() {
    const {
      handler, touched, meta, errors,
    } = this.props;
    const { hidePassword } = this.state;
    const error = errorMapper(errors, meta);
    if (meta.multiline) {
      return (
        <View>
          <CommonLabel text={`${meta.label}:`} />
          <Textarea
            {...handler()}
            rowSpan={meta.numberOfLines || 5}
            bordered
            placeholder="Enter optional notes"
            maxLength={meta.maxLength || null}
            onSubmitEditing={meta.onSubmitEditing || null}
            blurOnSubmit={meta.blurOnSubmit || true}
            returnKeyType={meta.returnKeyType || 'done'}
          />
        </View>
      );
    }
    return (
      <View>
        <Item inlineLabel error={touched && error !== null}>
          <CommonLabel text={`${meta.label}:`} />
          <Input
            ref={
              meta.inputRefs
                ? (input) => {
                  meta.inputRefs[meta.label] = input;
                }
                : null
            }
            keyboardType={meta.keyboardType || null}
            maxLength={meta.maxLength || null}
            numberOfLines={meta.numberOfLines || null}
            autoCapitalize={meta.autoCapitalize}
            autoCorrect={false}
            secureTextEntry={hidePassword && meta.secureTextEntry}
            onSubmitEditing={meta.onSubmitEditing || null}
            returnKeyType={meta.returnKeyType || 'done'}
            blurOnSubmit={meta.blurOnSubmit || true}
            {...handler()}
          />
          {touched && error !== null && <Icon name="alert" />}
          {meta.secureTextEntry && (
            <Button transparent onPress={() => this.toggleMask(!hidePassword)}>
              <Icon
                style={styles.revealPassword}
                name={hidePassword ? 'eye' : 'eye-off'}
              />
            </Button>
          )}
        </Item>
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{touched && error}</Text>
        </View>
      </View>
    );
  }
}

export default FormInput;
