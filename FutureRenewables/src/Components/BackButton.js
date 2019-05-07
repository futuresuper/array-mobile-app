
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'native-base';

const BackButton = (props) => {
  const { icon } = props;

  return (
    <Button
      transparent
      onPress={() => {
        props.screenProps.routeBack();
      }}
      {...props}
    >
      <Icon
        type={icon.type || undefined}
        name={icon.name}
        style={icon.style || {}}
      />
    </Button>
  )
};

BackButton.defaultProps = {
  icon: {
    type: undefined,
    name: 'ios-arrow-back',
    style: undefined,
  },
};

BackButton.propTypes = {
  icon: PropTypes.object,
};

export default BackButton;
