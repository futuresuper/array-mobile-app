
import React from 'react';
import {
  Button,
  Icon,
} from 'native-base';

const EditButton = props => (
  <Button
    transparent
    icon
    {...props}
  >
    <Icon type="FontAwesome" name="edit" />
  </Button>
);

export default EditButton;
