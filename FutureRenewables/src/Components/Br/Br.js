
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

import {
  styleConstants,
} from 'src/Styles';

const Br = ({ width, style }) => (
  <View style={[
    {
      borderBottomWidth: width,
      borderBottomColor: styleConstants.color.gray2,
      height: 1,
    },
    style,
  ]}
  />
);

Br.defaultProps = {
  width: 3,
  style: {},
};

Br.propTypes = {
  width: PropTypes.number,
  style: PropTypes.object,
};

export default Br;
