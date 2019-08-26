import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Modal } from 'react-native';
import { Button, Text } from 'native-base';

import SafeAreaView from 'src/Components/SafeAreaView';
import CloseButton from 'src/Components/CloseButton';
import { sg } from 'src/Styles';
import styles from './styles';

class ImageUploadModal extends Component {
  onRequestClose() {
    const { onRequestClose } = this.props;
    onRequestClose();
  }

  render() {
    const { visible, toggleCamera, toggleLibrary } = this.props;

    return (
      <Modal animated visible={visible} onRequestClose={() => this.onRequestClose()} transparent>
        <SafeAreaView>
          <View style={[sg.contentMarginV2]}>
            <View style={[sg.aIEnd]}>
              <CloseButton white onPress={() => this.onRequestClose()} />
            </View>
            <View style={styles.imageUploadButtonsContainer}>
              <Button
                onPress={() => {
                  toggleLibrary();
                }}
                bordered
                dark
                block
                marginVert
                style={sg.mT0}
              >
                <Text>Open Library</Text>
              </Button>
              <Button
                onPress={() => {
                  toggleCamera();
                }}
                bordered
                dark
                block
                marginVert
                style={sg.mT0}
              >
                <Text>Open Camera</Text>
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

ImageUploadModal.defaultProps = {
  visible: false,
  onRequestClose: () => null,
  toggleCamera: () => null,
  toggleLibrary: () => null,
};

ImageUploadModal.propTypes = {
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  toggleCamera: PropTypes.func,
  toggleLibrary: PropTypes.func,
};

export default ImageUploadModal;
