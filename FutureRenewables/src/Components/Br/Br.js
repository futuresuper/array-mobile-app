
import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
} from 'native-base';

const Br = ({ width, style, color }) => (
  <View
    br
    style={[
      {
        borderBottomWidth: width,
        height: 1,
      },
      (color ? { borderBottomColor: color } : {}),
      style,
    ]}
  />
);

Br.defaultProps = {
  width: 3,
  style: {},
  color: undefined,
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
