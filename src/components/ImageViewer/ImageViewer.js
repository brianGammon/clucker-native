/* @flow */
import React from 'react';
import { View, Icon, Button } from 'native-base';
import { Dimensions, Modal, Image } from 'react-native';
import styles from './styles';

type Props = {
  url: string,
  showModal: boolean,
  toggleModal: (visible: boolean) => void,
};

const ImageViewer = ({ url, showModal, toggleModal }: Props) => {
  let { height, width } = Dimensions.get('window');
  return (
    <Modal
      animationType="fade"
      transparent
      visible={showModal}
      supportedOrientations={['portrait', 'landscape']}
      onOrientationChange={() => {
        const { height: newHeight, width: newWidth } = Dimensions.get('window');
        height = newHeight;
        width = newWidth;
      }}
      onRequestClose={() => {}}
    >
      <View style={styles.modalContainer}>
        <Button
          large
          light
          transparent
          style={styles.closeButton}
          onPress={() => {
            toggleModal(!showModal);
          }}
        >
          <Icon style={styles.closeIcon} name="close" />
        </Button>
        <Image
          resizeMode="cover"
          style={{
            width: width < height ? width : height,
            height: width < height ? width : height,
          }}
          source={
            url
              ? { uri: url }
              : require('../../assets/default-profile-photo.png')
          }
        />
      </View>
    </Modal>
  );
};

export default ImageViewer;
