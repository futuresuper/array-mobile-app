
import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';
import {
  Button,
} from 'native-base';

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
      <Image source={EditIcon} />
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
