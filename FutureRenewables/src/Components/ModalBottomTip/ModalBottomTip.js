
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Modal,
} from 'react-native';
import {
  Text,
  Grid,
  Row,
} from 'native-base';

// import styles from './styles';

class ModalBottomTip extends Component {
  render() {
    return (
      <Modal
        visible
        transparent
      >
        <View style={{ height: 100, backgroundColor: 'white' }}>
          <Text>asd</Text>
        </View>
      </Modal>
    );
  }
}

export default ModalBottomTip;
