
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'native-base';

import {
  isIOS,
} from 'src/Common/Helpers';

import {
  styleGlobal,
} from 'src/Styles';

const CloseButton = props => (
  <Button
    transparent
    {...props}
    style={[(!isIOS() ? styleGlobal.mT10 : {})]}
  >
    <Icon name="close" />
  </Button>
);

export default CloseButton;
