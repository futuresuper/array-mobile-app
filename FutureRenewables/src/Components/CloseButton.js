
import React from 'react';
import {
  Button,
  Icon,
} from 'native-base';

import {
  isIOS,
} from 'src/Common/Helpers';

import {
  sg,
  sc,
} from 'src/Styles';

const CloseButton = props => (
  <Button
    transparent
    {...props}
    style={[(!isIOS() ? sg.mT10 : {})]}
  >
    <Icon name="close" style={{ marginRight: sc.contentPadding }} />
  </Button>
);

export default CloseButton;
