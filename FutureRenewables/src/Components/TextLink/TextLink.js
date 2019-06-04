import React from 'react';
import PropTypes from 'prop-types';
import {
  Linking,
} from 'react-native';
import {
  Text,
} from 'native-base';

import styles from './styles';

const TextLink = ({ children, url, email }) => (
  <Text
    onPress={() => {
      if (url) {
        Linking.openURL(url);
      } else if (email) {
        const openEmail = `mailto:${email}`;
        Linking.openURL(openEmail);
      }
    }}
    style={styles.text}
  >
    {children}
  </Text>
);

TextLink.defaultProps = {
  url: null,
  email: null,
};

TextLink.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string,
  email: PropTypes.string,
};

export default TextLink;
