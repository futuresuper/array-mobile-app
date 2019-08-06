
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  Icon,
  H1,
} from 'native-base';

import {
  formatAmountDollar,
} from 'src/Common/Helpers';
import BottomInfo from 'src/Components/BottomInfo';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

const Balance = ({ onPress, style, balance }) => {
  const balanceFormated = formatAmountDollar(balance);

  return (
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
        <TouchableOpacity
          onPress={() => {
            BottomInfo.showBalance();
          }}
        >
          <Icon type="EvilIcons" name="question" style={[sg.colorGray11, sg.mR5]} />
        </TouchableOpacity>

        <H1 style={styles.mainAmount}>{balanceFormated}</H1>
        <Text style={styles.mainAmountCent}>.00</Text>
      </View>
    </View>
  );
};

Balance.defaultProps = {
  style: {},
  onPress: () => null,
  balance: 0,
};

Balance.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  onPress: PropTypes.func,
  balance: PropTypes.number,
};

export default Balance;
