
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Modal from 'react-native-modal';
import {
  Modal,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  Text,
} from 'native-base';
import { RNCamera } from 'react-native-camera';

import SafeAreaView from 'src/Components/SafeAreaView';
import CloseButton from 'src/Components/CloseButton';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ratio: '1:1',
    };
  }

  onModalRequestClose = () => {
    const { onRequestClose } = this.props;
    onRequestClose();
  }

  renderButtons() {
    return (
      <View style={[styles.cameraButtonsContainer]}>
        <View style={{ borderWidth: 2, borderColor: 'green', alignSelf: 'flex-end', alignItems: 'center', flex: 1 }}>
          <TouchableOpacity
            onPress={this.onModalRequestClose}
          >
            <Text style={sg.colorWhite}>asd</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderCamera() {
    const { ratio } = this.state;

    return (
      <View style={sg.flex} >
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          key={ratio}
          style={[styles.cameraView]}
          type={RNCamera.Constants.Type.back}
          ratio={ratio}
          captureAudio={false}
        />
      </View>
    );
  }

  render() {
    const { visible } = this.props;

    return (
      <Modal
        animationType="slide"
        onRequestClose={() => this.onModalRequestClose()}
        visible={visible}
        transparent={false}
      >
        <View style={[sg.flex]}>
          <SafeAreaView style={sg.bGDark}>
            <View style={sg.flex}>
              {this.renderCamera()}
              {this.renderButtons()}
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    );
  }
}

Camera.defaultProps = {
  visible: false,
  onRequestClose: () => null,
};

Camera.propTypes = {
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

export default Camera;
