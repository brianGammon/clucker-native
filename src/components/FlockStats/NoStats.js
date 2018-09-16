/* @flow */
import React from 'react';
import { Container, Text, Content } from 'native-base';
import HelpMessage from '../HelpMessage';
import Header from '../Header';
import styles from './styles';

const NoStats = () => (
  <Container>
    <Header title="Flock Stats" eggButton />
    <Content padder>
      <HelpMessage>
        <Text style={styles.noFlocksMessageText}>
          Get started by logging some eggs using the &#34;+ Egg&#34; button
          above.
        </Text>
      </HelpMessage>
    </Content>
  </Container>
);

export default NoStats;
