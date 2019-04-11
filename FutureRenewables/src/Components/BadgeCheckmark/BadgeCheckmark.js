
import React from 'react';
import {
  Badge,
  Icon,
} from 'native-base';

import styles from './styles';

const BadgeCheckmark = () => (
  <Badge style={styles.badge}>
    <Icon name="md-checkmark" style={styles.badgeIcon} />
  </Badge>
);

export default BadgeCheckmark;
