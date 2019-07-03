
import React, { Component } from 'react';
import {
  View,
  Animated,
} from 'react-native';

import {
  Button,
  Text,
  Icon,
  View as ViewNB,
} from 'native-base';

import {
  ucFirst,
} from 'src/Common/Helpers';

import styles from './styles';

class Toast extends Component {
  // eslint-disable-next-line react/sort-comp
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      fadeAnim: new Animated.Value(0),
    };
  }

  static toastInstance;
  static show({ ...config }) {
    this.toastInstance.showToast({ config });
  }

  static hide() {
    if (this.toastInstance.getModalState()) {
      this.toastInstance.closeToast('functionCall');
    }
  }

  getToastStyle() {
    const { fadeAnim, position } = this.state;

    return {
      position: 'absolute',
      opacity: fadeAnim,
      width: '100%',
      elevation: 9,
      top: position === 'top' ? this.getTop() : undefined,
      bottom: position === 'bottom' ? this.getTop() : undefined,
    };
  }

  // eslint-disable-next-line class-methods-use-this
  getTop() {
    return 0;
  }

  // eslint-disable-next-line class-methods-use-this
  getButtonText(buttonText) {
    if (buttonText) {
      if (buttonText.trim().length === 0) {
        return undefined;
      }

      return buttonText;
    }
    return undefined;
  }

  getModalState() {
    const { modalVisible } = this.state;
    return modalVisible;
  }

  showToast({ config }) {
    this.setState({
      modalVisible: true,
      text: config.text,
      buttonText: this.getButtonText(config.buttonText),
      type: config.type,
      position: config.position ? config.position : 'bottom',
      style: config.style,
      buttonTextStyle: config.buttonTextStyle,
      buttonStyle: config.buttonStyle,
      textStyle: config.textStyle,
      onClose: config.onClose,
      iconType: config.iconType,
      iconName: config.iconName,
    });

    const { fadeAnim } = this.state;

    // If we have a toast already open, cut off its close timeout so that it won't affect *this* toast.
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }

    // Set the toast to close after the duration.
    if (config.duration !== 0) {
      const duration = (config.duration > 0) ? config.duration : 1500;
      this.closeTimeout = setTimeout(this.closeToast.bind(this, 'timeout'), duration);
    }

    // Fade the toast in now.
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
    }).start();
  }

  closeModal(reason) {
    this.setState({
      modalVisible: false,
    });
    const { onClose } = this.state;
    if (onClose && typeof onClose === 'function') {
      onClose(reason);
    }
  }

  closeToast(reason) {
    const { fadeAnim } = this.state;

    clearTimeout(this.closeTimeout);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
    }).start(this.closeModal.bind(this, reason));
  }

  render() {
    const {
      style,
      textStyle,
      buttonStyle,
      buttonTextStyle,
      modalVisible,
      type,
      text,
      buttonText,
      iconName,
      iconType,
    } = this.state;

    if (modalVisible) {
      const tastBg = `bgToast${ucFirst(type)}`;

      return (
        <Animated.View style={this.getToastStyle()}>
          <ViewNB
            style={[styles.container, styles[type], style]}
            {...{ [tastBg]: true }}
          >
            <View style={styles.subContainer}>
              {iconName && <Icon type={iconType} name={iconName} style={styles.icon} />}

              {(typeof text === 'string')
                ? (
                  <Text style={[styles.text, styles[`text_${type}`], textStyle]}>{text}</Text>
                )
                : (
                  text
                )
              }
            </View>

            {buttonText && (
              <Button
                style={[styles.button, buttonStyle]}
                onPress={() => this.closeToast('user')}
              >
                <Text style={[styles.buttonText, styles[`text_${type}`], buttonTextStyle]}>
                  {buttonText}
                </Text>
              </Button>
            )}
          </ViewNB>
        </Animated.View>
      );
    }

    return null;
  }
}

export default Toast;
