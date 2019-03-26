
import React from 'react';
import {
  Button,
  Icon,
} from 'native-base';

const BackButton = props => (
  <Button
    transparent
    onPress={() => {
      props.screenProps.routeBack();
    }}
    {...props}
  >
    <Icon name="ios-arrow-back" />
  </Button>
);

export default BackButton;
