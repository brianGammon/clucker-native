/* @flow */
import React from 'react';
import {
  View, Text, Button, Icon, Accordion, Content, H3,
} from 'native-base';
import styles from './styles';

type Props = {
  error: string,
  uid: string,
  startListening: (uid: string) => void,
  clearErrors: () => void,
};

const ErrorHandlerRenderer = ({
  error,
  uid,
  startListening,
  clearErrors,
}: Props) => (
  <Content style={styles.container}>
    <H3>Sorry, something went wrong</H3>
    <View style={styles.helpTextContainer}>
      <Text style={styles.helpTextItem}>Things you can try:</Text>
      <Text style={styles.helpTextItem}>
        {`${'\u2022'} Make sure you have an internet connection, then tap Reload.`}
      </Text>
      <Text style={styles.helpTextItem}>
        {`${'\u2022'} Sign out in Settings, then sign in again.`}
      </Text>
      <View style={styles.buttonsContainer}>
        <Button bordered dark small onPress={() => startListening(uid)}>
          <Icon name="refresh" />
          <Text style={styles.buttonText}>Reload</Text>
        </Button>
        <Button bordered dark small onPress={() => clearErrors()}>
          <Icon name="close" />
          <Text style={styles.buttonText}>Dismiss</Text>
        </Button>
      </View>
    </View>
    <Accordion
      dataArray={[{ title: 'Error Details', content: error }]}
      headerStyle={styles.accordianHeader}
      contentStyle={styles.accordianContent}
      expanded={1}
    />
  </Content>
);

export default ErrorHandlerRenderer;
