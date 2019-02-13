
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
  ActivityIndicator
} from 'react-native';

import {
  Button,
  Text,
} from 'native-base';

import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontWeight: 'bold'
  }
});

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      textContent: this.props.textContent,
      onStop: this.props.onStop,
    };
  }

  static propTypes = {
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

  static defaultProps = {
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

  show(config) {
    config = Object.assign({
      text: '',
      onStop: null,
    }, config);

    this.setState({
      visible: true,
      textContent: config.text,
      onStop: config.onStop,
    });
  }

  hide() {
    this.setState({
      visible: false,
    });
  }

  close() {
    this.setState({ visible: false });
  }

  componentWillReceiveProps(nextProps) {
    // const { visible, textContent, onStop } = nextProps;
    // this.setState({ visible, textContent, onStop });
  }

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  _renderDefaultContent() {
    const { textStyle, trans } = this.props;

    return (
      <View style={styles.background}>
        <ActivityIndicator
          color={this.props.color}
          size={this.props.size}
          style={{flex: 1}}
        />

        {(this.state.textContent !== '') &&
          <View style={styles.textContainer}>
            <Text style={[styles.textContent, textStyle]}>{this.state.textContent}</Text>
          </View>
        }

        {!_.isNil(this.state.onStop) &&
          <View style={styles.textContainer}>
            <Button warning small
              style={{
                alignSelf: 'center',
                top: 50,
              }}
              onPress={() => {
                this.close();
                this.state.onStop();
              }}
            >
              <Text>{trans.cancel}</Text>
            </Button>
          </View>
        }
      </View>);
  }

  _renderSpinner() {
    const { visible } = this.state;

    if (!visible) {
      return null;
    }

    const spinner = (
      <View style={[
        styles.container,
        { backgroundColor: this.props.overlayColor }
      ]} key={`spinner_${Date.now()}`}>
        {this.props.children ? this.props.children : this._renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        style={{zIndex: 200}}
        animationType={this.props.animation}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={visible}>
        {spinner}
      </Modal>
    );
  }

  render() {
    return this._renderSpinner();
  }
}
