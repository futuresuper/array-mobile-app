
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import {
  Text,
  Button,
  Icon,
  H1,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

const Balance = ({ onPress, style }) => (
  <View style={[sg.aICenter, sg.mT50, sg.mB25, style]}>
    <Button
      transparent
      iconRight
      style={sg.aSCenter}
      onPress={onPress}
    >
      <Text style={styles.title}>Grace</Text>
      <Icon name="ios-arrow-down" style={styles.titleIcon} />
    </Button>

    <View style={sg.row}>
      <H1 style={styles.mainAmount}>$1,978</H1>
      <Text style={styles.mainAmountCent}>.00</Text>
    </View>
  </View>
);

Balance.defaultProps = {
  style: {},
  onPress: () => null,
};

Balance.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onPress: PropTypes.func,
};

export default Balance;
