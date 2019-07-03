
import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  View as ViewNB,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

const TextUnderline = (props) => {
  const {
    children,
    style,
    styleText,
    theme,
  } = props;

  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, style]}
    >
      <ViewNB style={[styles.subContainer, (theme ? {} : sg.borderColorPrimary)]} br3={theme}>
        <Text style={[styles.text, (theme ? {} : sg.colorDark3), styleText]} underline color4={theme}>{children}</Text>
      </ViewNB>
    </TouchableOpacity>
  );
};

TextUnderline.defaultProps = {
  style: {},
  styleText: {},
  theme: false,
};

TextUnderline.propTypes = {
  children: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  styleText: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  theme: PropTypes.bool,
};

export default TextUnderline;
