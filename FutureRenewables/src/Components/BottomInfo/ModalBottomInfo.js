
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import BottomInfo from './BottomInfo';

import {
  sg,
} from 'src/Styles';
import styles from './styles';

class ModalBottomInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      content: null,
    };
  }

  hide = () => {
    this.setState({
      visible: false,
      content: null,
    });
  }

  show(content) {
    this.setState({
      visible: true,
      content,
    });
  }

  render() {
    const { visible, content } = this.state;

    return (
      <Modal
        swipeDirection="down"
        backdropOpacity={0}
        isVisible={visible}
        onSwipeComplete={this.hide}
        onBackdropPress={this.hide}
        style={sg.m0}
      >
        <View style={[styles.container, styles.containerModal]}>
          <View style={styles.topLine} />

          <View style={sg.flex}>
            {content}
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalBottomInfo;
