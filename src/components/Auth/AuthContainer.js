/* @flow */
import * as React from 'react';
import { ImageBackground } from 'react-native';
import {
  View, Text, Container, Content, H2,
} from 'native-base';
import AuthHeader from './AuthHeader';
import styles from './styles';
import type AuthExtraLink from './AuthExtraLink';

type Props = {
  title: string,
  error: string,
  children: any,
  extraLinks: AuthExtraLink[],
};

const AuthBase = ({
  title, error, children, extraLinks,
}: Props) => (
  <Container>
    <ImageBackground
      source={require('../../assets/rays.jpg')}
      style={styles.imageBackground}
    >
      <Content contentContainerStyle={styles.container}>
        <View padder style={styles.body}>
          <AuthHeader />
          <H2 style={styles.title}>{title}</H2>
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.formContainer}>{children}</View>
          {extraLinks
            && extraLinks.length > 0 && (
              <View padder>{extraLinks.map(link => link)}</View>
          )}
        </View>
      </Content>
    </ImageBackground>
  </Container>
);

export default AuthBase;
