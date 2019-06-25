
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

import {
  styleConstants,
} from 'src/Styles';

const Br = ({ width, style, color }) => (
  <View style={[
    {
      borderBottomWidth: width,
      borderBottomColor: color,
      height: 1,
    },
    style,
  ]}
  />
);

Br.defaultProps = {
  width: 3,
  style: {},
  color: styleConstants.color.gray6,
};

Br.propTypes = {
  width: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  color: PropTypes.string,
};

export default Br;
