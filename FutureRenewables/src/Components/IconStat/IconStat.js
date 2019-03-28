
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Icon,
} from 'native-base';

import styles from './styles';

const IconStat = ({ value, description, icon }) => (
  <View style={styles.container}>
    <View primary style={styles.iconBl}>
      <Icon type={icon.type || ''} name={icon.name} style={[styles.icon, { fontSize: icon.fontSize || 22 }]} />
      <Text style={styles.iconText}>{value}</Text>
    </View>
    <Text style={styles.description}>{description}</Text>
  </View>
);

IconStat.defaultProps = {
  icon: {
    type: '',
    name: 'ios-backspace',
    fontSize: 22,
  },
};

IconStat.propTypes = {
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    fontSize: PropTypes.number,
  }),
};

export default IconStat;
