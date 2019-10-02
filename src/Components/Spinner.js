
//     react-native-loading-spinner-overlay
//     Copyright (c) 2016- Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

// * Author: [@niftylettuce](https://twitter.com/#!/niftylettuce)
// * Source:
// <https://github.com/niftylettuce/react-native-loading-spinner-overlay>

// # react-native-loading-spinner-overlay
//
// <https://github.com/facebook/react-native/issues/2501>
// <https://rnplay.org/apps/1YkBCQ>
// <https://github.com/facebook/react-native/issues/2501>
// <https://github.com/brentvatne/react-native-overlay>
//

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  // Text,
  Modal,
  ActivityIndicator,
} from 'react-native';

import {
  Button,
  Text,
} from 'native-base';

import { isNil } from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textContent: {
    top: -40,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    const { visible, textContent, onStop } = this.props;
    this.state = {
      visible,
      textContent,
      onStop,
    };
  }


  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   // const { visible, textContent, onStop } = nextProps;
  //   // this.setState({ visible, textContent, onStop });
  // }

  close() {
    this.setState({ visible: false });
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  show(config) {
    const conf = {
      text: '',
      onStop: null,
      ...config,
    };
    this.setState({
      visible: true,
      textContent: conf.text,
      onStop: conf.onStop,
    });
  }

  _handleOnRequestClose() {
    const { cancelable } = this.props;
    if (cancelable) {
      this.close();
    }
  }

  _renderDefaultContent() {
    const {
      textStyle, trans, color, size,
    } = this.props;

    const {
      textContent, onStop,
    } = this.state;

    return (
      <View style={styles.background}>
        <ActivityIndicator
          color={color}
          size={size}
          style={{ flex: 1 }}
        />

        {(textContent !== '')
          && (
          <View style={styles.textContainer}>
            <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
          </View>
          )}

        {!isNil(onStop)
          && (
          <View style={styles.textContainer}>
            <Button
              warning
              small
              style={{
                alignSelf: 'center',
                top: 50,
              }}
              onPress={() => {
                this.close();
                onStop();
              }}
            >
              <Text>{trans.cancel}</Text>
            </Button>
          </View>
          )}
      </View>
    );
  }

  _renderSpinner() {
    const { visible } = this.state;
    const { overlayColor, children, animation } = this.props;

    if (!visible) {
      return null;
    }

    const spinner = (
      <View
        style={[
          styles.container,
          { backgroundColor: overlayColor },
        ]}
        key={`spinner_${Date.now()}`}
      >
        {children || this._renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        style={{ zIndex: 200 }}
        animationType={animation}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={visible}
      >
        {spinner}
      </Modal>
    );
  }

  render() {
    return this._renderSpinner();
  }
}


Spinner.defaultProps = {
  visible: false,
  cancelable: false,
  textContent: '',
  onStop: null,
  animation: 'none',
  color: 'white',
  size: 'large', // 'normal',
  overlayColor: 'rgba(0, 0, 0, 0.25)',
  textStyle: {},
};


Spinner.propTypes = {
  visible: PropTypes.bool,
  cancelable: PropTypes.bool,
  textContent: PropTypes.string,
  onStop: PropTypes.func,
  animation: PropTypes.oneOf(ANIMATION),
  color: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  overlayColor: PropTypes.string,
  textStyle: PropTypes.object,
};
