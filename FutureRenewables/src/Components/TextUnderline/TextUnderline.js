
import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import {
  Text,
} from 'native-base';

import styles from './styles';

const TextUnderline = (props) => {
  const { children, style, styleText } = props;

  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, style]}
    >
      <Text style={[styles.text, styleText]}>{children}</Text>
    </TouchableOpacity>
  );
};

TextUnderline.defaultProps = {
  style: {},
  styleText: {},
};

TextUnderline.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  styleText: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default TextUnderline;
