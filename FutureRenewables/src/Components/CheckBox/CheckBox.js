
import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import {
  Icon,
} from 'native-base';

import styles from './styles';

const CheckBox = ({ onPress, checked, error }) => (
  <TouchableOpacity
    style={[
      styles.container,
      (error ? styles.containerError : {}),
    ]}
    onPress={onPress}
  >
    <Icon
      style={[
        styles.icon,
        { color: checked === true ? 'green' : 'transparent' },
      ]}
      name="md-checkmark"
    />
  </TouchableOpacity>
);

CheckBox.defaultProps = {
  onPress: () => null,
  checked: false,
  error: false,
};

CheckBox.propTypes = {
  onPress: PropTypes.func,
  checked: PropTypes.bool,
  error: PropTypes.bool,
};

export default CheckBox;
