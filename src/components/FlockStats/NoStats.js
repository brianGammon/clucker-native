/* @flow */
import React from 'react';
import { Container, Text, Content } from 'native-base';
import HelpMessage from '../HelpMessage';
import Header from '../Header';

const NoStats = () => (
  <Container>
    <Header title="Flock Stats" eggButton />
    <Content padder>
      <HelpMessage>
        <Text>
          No eggs have been logged yet. Get started by tapping the &#34;+&#34;
          button above.
        </Text>
      </HelpMessage>
    </Content>
  </Container>
);

export default NoStats;
