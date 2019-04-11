
import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Icon,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

const TextQuestion = (props) => {
  const { style, text } = props;

  return (
    <TouchableOpacity
      {...props}
      style={[sg.row, style]}
    >
      <Text style={styles.text}>{text}</Text>
      <Icon type="EvilIcons" name="question" style={sg.colorGray} />
    </TouchableOpacity>
  );
};

TextQuestion.defaultProps = {
  style: {},
};

TextQuestion.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default TextQuestion;
