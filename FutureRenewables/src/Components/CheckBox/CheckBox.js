
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import {
  Icon,
} from 'native-base';

import styles from './styles';

class CheckBox extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
      >
        <Icon
          style={[styles.icon, { color: this.props.checked === true ? 'green' : 'transparent' }]}
          name={'md-checkmark'}
        />
      </TouchableOpacity>
    );
  }
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onPress: PropTypes.func,
};

export default CheckBox;
