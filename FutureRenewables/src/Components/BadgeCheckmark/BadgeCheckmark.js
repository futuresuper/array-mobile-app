
import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import {
  Icon,
} from 'native-base';

import styles from './styles';

const BadgeCheckmark = (props) => {
  const { checked, inverted, style } = props;

  let badgeStyle = {};
  let iconName = 'md-checkmark';
  let iconTickStyle = styles.iconTickColor;

  if (inverted) {
    if (checked) {
      badgeStyle = styles.badgeInverted;
      iconTickStyle = styles.iconTickColorInverted;
    } else {
      iconName = null;
      badgeStyle = styles.badgeUntickInverted;
      iconTickStyle = styles.iconUntickColorInverted;
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (!checked) {
      iconTickStyle = styles.iconUntickTickColor;
    }
  }

  return (
    <TouchableOpacity
      {...props}
      style={[styles.badge, badgeStyle, style]}
    >
      <Icon
        name={iconName}
        style={[
          styles.badgeIcon,
          iconTickStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

BadgeCheckmark.defaultProps = {
  checked: true,
  inverted: false,
  style: {},
};

BadgeCheckmark.propTypes = {
  checked: PropTypes.bool,
  inverted: PropTypes.bool,
  style: PropTypes.object,
};

export default BadgeCheckmark;
