import * as React from 'react';
import { Spinner, Text, Container } from 'native-base';

import styles from './styles';

type Props = {
  message: string,
};

const Loading = ({ message }: { message: Props.message }) => (
  <Container style={styles.container}>
    <Spinner color="rgb(249, 149, 0)" />
    {message && <Text style={styles.message}>{message}</Text>}
  </Container>
);

export default Loading;
