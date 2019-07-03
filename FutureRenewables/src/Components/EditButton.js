
import React from 'react';
import PropTypes from 'prop-types';
import {
} from 'react-native';
import {
  Button,
} from 'native-base';

import Image from 'src/Components/Image';

import {
  sg,
} from 'src/Styles';

import EditIcon from 'src/assets/images/Edit.png';

const EditButton = (props) => {
  const {
    style,
  } = props;

  return (
    <Button
      transparent
      {...props}
      style={[sg.contentMarginRight, sg.aSCenter, style]}
    >
      <Image source={EditIcon} color0 />
    </Button>
  );
};

EditButton.defaultProps = {
  style: {},
};

EditButton.propTypes = {
  style: PropTypes.object,
};

export default EditButton;
