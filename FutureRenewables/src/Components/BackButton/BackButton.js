
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'native-base';

import {
  sc,
} from 'src/Styles';

import styles from './styles';

const iconSignUp = {
  name: 'md-arrow-back',
  style: {
    fontSize: 30,
    color: sc.color.gray11,
  },
};

const BackButton = (props) => {
  const { signup, header } = props;
  let { icon } = props;

  if (signup) {
    icon = iconSignUp;
  }

  const style = header ? {} : styles.outOfHeader;

  return (
    <Button
      transparent
      onPress={() => {
        props.screenProps.routeBack();
      }}
      style={style}
      {...props}
    >
      <Icon
        type={icon.type || undefined}
        name={icon.name}
        style={icon.style || {}}
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
  signup: false,
  header: true,
};

BackButton.propTypes = {
  icon: PropTypes.object,
  signup: PropTypes.bool,
  header: PropTypes.bool,
};

export default BackButton;
