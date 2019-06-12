
import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';
import {
  Button,
  Icon,
} from 'native-base';

import CloseCircle from 'src/assets/images/CloseCircle.png';

import styles from './styles';

const CloseButton = (props) => {
  const { style, white, navigation } = props;

  return (
    <Button
      transparent
      onPress={() => {
        if (navigation) {
          navigation.popToTop();
        }
      }}
      {...props}
      style={[styles.button, style]}
    >
      {white
        ? <Image source={CloseCircle} />
        : <Icon name="close" style={styles.icon} />
      }
    </Button>
  );
};

CloseButton.defaultProps = {
  white: false,
  style: {},
};

CloseButton.propTypes = {
  white: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default CloseButton;
