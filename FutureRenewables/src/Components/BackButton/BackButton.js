
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'native-base';

import {
  sc,
  sg,
} from 'src/Styles';

import styles from './styles';

const iconSignUp = {
  name: 'md-arrow-back',
  style: {
    fontSize: 32,
    color: sc.color.gray11,
  },
};

const BackButton = (props) => {
  const {
    signup,
    header,
    style,
    iconStyle,
  } = props;
  let { icon } = props;

  if (signup) {
    icon = iconSignUp;
  }

  const styleHeader = header ? {} : styles.outOfHeader;

  return (
    <Button
      transparent
      onPress={() => {
        props.screenProps.routeBack();
      }}
      {...props}
      style={[styles.button, styleHeader, style]}
    >
      <Icon
        type={icon.type || undefined}
        name={icon.name}
        style={[sg.colorDark3, icon.style || {}, iconStyle]}
      />
    </Button>
  );
};

BackButton.defaultProps = {
  icon: {
    type: undefined,
    name: 'ios-arrow-back',
    style: undefined,
  },
  iconStyle: {},
  signup: false,
  header: true,
  style: {},
};

BackButton.propTypes = {
  icon: PropTypes.object,
  iconStyle: PropTypes.object,
  signup: PropTypes.bool,
  header: PropTypes.bool,
  style: PropTypes.object,
};

export default BackButton;
