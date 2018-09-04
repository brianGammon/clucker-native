/* @flow */
import React from 'react';
import {
  View,
  Input,
  Item,
  Icon,
  Text,
  Label,
  Button,
  Textarea,
} from 'native-base';
import errorMapper from '../../utils/errorMapper';
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
          <Label style={styles.label}>{meta.label}:</Label>
          <Textarea
            {...handler()}
            rowSpan={meta.numberOfLines || 5}
            bordered
            placeholder="Notes"
            maxLength={meta.maxLength || null}
          />
        </View>
      );
    }
    return (
      <View>
        <Item inlineLabel error={touched && error !== null}>
          <Label style={styles.label}>{meta.label}:</Label>
          <Input
            keyboardType={meta.keyboardType || null}
            maxLength={meta.maxLength || null}
            numberOfLines={meta.numberOfLines || null}
            autoCapitalize={meta.autoCapitalize}
            secureTextEntry={hidePassword && meta.secureTextEntry}
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
