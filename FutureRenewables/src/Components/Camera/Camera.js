
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Modal from 'react-native-modal';
import {
  Modal,
  View,
  TouchableOpacity,
  StatusBar,
  ImageEditor,
} from 'react-native';
import {
  Text,
} from 'native-base';
import { RNCamera } from 'react-native-camera';
import Orientation from 'react-native-orientation-locker';

import SafeAreaView from 'src/Components/SafeAreaView';
import CloseButton from 'src/Components/CloseButton';


import Toast from 'src/Components/Toast';

import {
  isIOS,
} from 'src/Common/Helpers';

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

    this.isLandscape = false;
  }

  componentDidMount() {
    if (!isIOS()) {
      Orientation.addDeviceOrientationListener(this.orientationDidChange);
      Orientation.getDeviceOrientation(this.orientationDidChange);
    }
  }

  componentWillUnmount() {
    if (!isIOS()) {
      Orientation.removeDeviceOrientationListener(this.orientationDidChange);
    }
  }

  orientationDidChange = (orientation) => {
    if (orientation === 'UNKNOWN') {
      return;
    }
    this.isLandscape = orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT';
  }

  onModalRequestClose = () => {
    const { onRequestClose } = this.props;
    onRequestClose();
  }

  onTakePhoto = () => {
    const { onTakePhoto } = this.props;
    const { ratio } = this.state;
    const isIOSv = isIOS();

    if (!this.camera) {
      return;
    }

    if (this.cameraProcessing) {
      alert('Camera is processing, cannot take another photo until it finished processing');
      return;
    }


    this.cameraProcessing = true;

    let width = 600;
    if (!isIOSv) {
      if (ratio === '4:3' && this.isLandscape) {
        width *= 4 / 3;
      }
    }

    const options = { quality: 0.5, base64: false, width };
    if (!isIOSv) {
      options.fixOrientation = true;
    }

    this.camera.takePictureAsync(options)
      .then((data) => {
        if (data.height === data.width) {
          onTakePhoto(data);
          this.cameraProcessing = false;
        } else {
          let offsetX = 0;
          let offsetY = 0;
          if (data.height > data.width) {
            offsetY = (data.height - data.width) / 2;
          } else {
            offsetX = (data.width - data.height) / 2;
          }
          const squareDimension = Math.min(data.height, data.width);

          ImageEditor.cropImage(data.uri, {
            offset: { x: offsetX, y: offsetY },
            size: { width: squareDimension, height: squareDimension },
          }, (res) => {
            onTakePhoto({ uri: res });
            this.cameraProcessing = false;
          }, () => {
            this.cameraProcessing = false;
          });
        }
      })
      .catch(() => {
        this.cameraProcessing = false;
      });
  }

  checkCameraAspectRatio = () => {
    if (!this.camera) {
      return;
    }

    if (!isIOS()) {
      this.camera.getSupportedRatiosAsync()
        .then((ratios) => {
          const ratio = ratios.includes('1:1') ? '1:1' : '4:3';
          this.setState({
            ratio,
          });
        });
    }
  }

  renderButtons() {
    return (
      <View style={[styles.cameraButtonsContainer]}>
        <View style={styles.buttonsBottom}>
          <TouchableOpacity
            onPress={this.onModalRequestClose}
          >
            <Text style={[sg.colorWhite, sg.fS22]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.onTakePhoto}
          >
            <Text style={[sg.colorWhite, sg.fS22]}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderCamera() {
    const { ratio } = this.state;

    return (
      <View style={sg.flex}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          key={ratio}
          onCameraReady={this.checkCameraAspectRatio}
          style={[styles.cameraView]}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
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
          <StatusBar
            backgroundColor="rgb(0, 0, 0)"
            hidden={isIOS()}
          />

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
  onTakePhoto: () => null,
};

Camera.propTypes = {
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onTakePhoto: PropTypes.func,
};

export default Camera;
