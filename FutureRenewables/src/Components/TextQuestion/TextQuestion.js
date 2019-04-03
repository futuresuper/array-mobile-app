
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import {
  Text,
  Icon,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

const TextQuestion = ({ style, text }) => (
  <View style={[sg.row, style]}>
    <Text style={styles.text}>{text}</Text>
    <Icon type="EvilIcons" name="question" style={sg.colorGray} />
  </View>
);

TextQuestion.defaultProps = {
  style: {},
};

TextQuestion.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default TextQuestion;
