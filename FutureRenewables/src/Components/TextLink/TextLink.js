
import React from 'react';
import PropTypes from 'prop-types';
import {
  Linking,
} from 'react-native';
import {
  Text,
} from 'native-base';

import styles from './styles';

const TextLink = ({ children, url }) => (
  <Text
    onPress={() => {
      Linking.openURL(url);
    }}
    style={styles.text}
  >
    {children}
  </Text>
);

TextLink.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default TextLink;
