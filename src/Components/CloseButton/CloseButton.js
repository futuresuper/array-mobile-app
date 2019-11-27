
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';
import {
  Button,
  Icon,
} from 'native-base';

import CloseCircle from 'src/assets/images/CloseCircle.png';
import CloseCircleDark from 'src/assets/images/CloseCircleDark.png';

import styles from './styles';

class CloseButton extends Component {
  renderImage() {
    const { themeMode } = this.props;
    let image = CloseCircle;

    if (themeMode === 'dark') {
      image = CloseCircleDark;
    }

    return <Image source={image} />;
  }

  render() {
    const { style, white, navigation } = this.props;

    return (
      <Button
        transparent
        onPress={() => {
          if (navigation) {
            navigation.goBack(null);
          }
        }}
        {...this.props}
        style={[styles.button, style]}
      >
        {white
          ? this.renderImage()
          : <Icon name="close" style={styles.icon} />}
      </Button>
    );
  }
}

CloseButton.defaultProps = {
  white: false,
  style: {},
  themeMode: 'light',
};

CloseButton.propTypes = {
  white: PropTypes.bool,
  themeMode: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default CloseButton;
