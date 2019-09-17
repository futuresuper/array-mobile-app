
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
      (error && styles.containerError),
      (checked && styles.containerChecked),
    ]}
    onPress={onPress}
  >
    <Icon
      style={[
        styles.icon,
        (checked && styles.iconChecked),
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
