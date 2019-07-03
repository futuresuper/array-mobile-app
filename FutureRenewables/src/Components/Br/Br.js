
import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
} from 'native-base';

const Br = ({
  width,
  style,
  color,
  br: brInp,
  brList: brListInp,
}) => {
  let br = brInp;
  let brList = false;

  if (brListInp) {
    brList = true;
    br = false;
  }

  return (
    <View
      br={br}
      brList={brList}
      style={[
        {
          borderBottomWidth: width,
          height: 1,
        },
        (color ? { borderBottomColor: color } : {}),
        style,
      ]}
    />
  )
};

Br.defaultProps = {
  width: 3,
  style: {},
  color: undefined,
  br: true,
  brList: false,
};

Br.propTypes = {
  width: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  color: PropTypes.string,
  br: PropTypes.bool,
  brList: PropTypes.bool,
};

export default Br;
