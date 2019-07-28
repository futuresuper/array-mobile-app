
import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  View as ViewNB,
  Icon,
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
    theme2,
    iconRight: iconRightProps,
  } = props;
  let iconRight;

  if (iconRightProps) {
    iconRight = {
      type: undefined,
      ...iconRightProps,
      style: {
        ...styles.icon,
        ...iconRightProps.style || {},
      },
    };
  }

  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, style]}
    >
      <ViewNB style={[styles.subContainer, sg.borderColorPrimary]}>
        <Text style={[styles.text, ((theme || theme2) ? {} : sg.colorDark3), styleText]} underline color4={theme} color={theme2}>{children}</Text>
        {iconRight && <Icon type={iconRight.type} name={iconRight.name} style={iconRight.style} />}
      </ViewNB>
    </TouchableOpacity>
  );
};

TextUnderline.defaultProps = {
  style: {},
  styleText: {},
  theme: false,
  theme2: false,
  iconRight: null,
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
  theme2: PropTypes.bool,
  iconRight: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  }),
};

export default TextUnderline;
