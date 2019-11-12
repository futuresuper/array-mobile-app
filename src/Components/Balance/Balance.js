
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
  formatAmountDollarCent,
} from 'src/Common/Helpers';

import BottomInfo from 'src/Components/BottomInfo';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

const Balance = ({
  onPress, style, account, user,
}) => {
  if (account) {
    const balance = {};
    if (account.balanceIncludingPendingInDollars) {
      const rawBalance = formatAmountDollarCent(account.balanceIncludingPendingInDollars);
      balance.dollars = rawBalance.substring(0, rawBalance.length - 3);
      balance.cents = rawBalance.substring(rawBalance.length - 2, rawBalance.length);
    } else {
      balance.dollars = '$0';
      balance.cents = '00';
    }

    let nickName;
    if (account.nickName) {
      nickName = account.nickName;
    } else if (user && user.firstName) {
      nickName = user.firstName;
    } else {
      nickName = 'Accounts';
    }

    return (
      <View style={[sg.aICenter, sg.mT25, sg.mB10, style]}>
        <Button
          transparent
          iconRight
          style={sg.aSCenter}
          onPress={onPress}
        >
          <Text style={styles.title}>{nickName}</Text>
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

          <H1 style={styles.mainAmount}>{balance.dollars}</H1>
          <Text style={styles.mainAmountCent}>{`.${balance.cents}`}</Text>
        </View>
      </View>
    );
  }
  return null;
};

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
  account: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Balance;
