
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
  formatAmountDollarCent,
} from 'src/Common/Helpers';


import BottomInfo from 'src/Components/BottomInfo';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

const renderAwaitingDirectDebit = (data) => {
  if (data) {
    return (
      <Text style={styles.awaitingDebit}>
        {`Includes ${formatAmountDollar(data)} awaiting direct debit`}
      </Text>
    );
  }
  return null;
}

const Balance = ({
  onPress, style, selectedAccount, user, unitPrices
}) => {

  if (selectedAccount) {
    const balance = {};
    const displayAmount = parseFloat(selectedAccount.balanceIncludingPendingInDollars) + parseFloat(selectedAccount.amountAwaitingDirectDebit);
    if ( displayAmount > 1) {
      const rawBalance = formatAmountDollarCent(displayAmount);
      balance.dollars = rawBalance.substring(0, rawBalance.length - 3);
      balance.cents = rawBalance.substring(rawBalance.length - 2, rawBalance.length);
    } else {
      balance.dollars = '$0';
      balance.cents = '00';
    }

    let nickName;
    if (selectedAccount.nickName) {
      nickName = selectedAccount.nickName;
    } else if (user && user.firstName) {
      nickName = user.firstName;
    } else {
      nickName = 'Accounts';
    }

    return (
      <View style={[sg.aICenter, sg.mT15, sg.mB25]}>

        <Button
          transparent
          iconRight
          style={sg.aSCenter}
          onPress={() => {
            BottomInfo.showAccounts();
            // screenProps.navigateTo(routeNames.ACCOUNTS); // CHANGE TO MODAL BOTTOM WHEN FIXED
          }}
        >
          <Text style={styles.title}>{nickName}</Text>
          <Icon name="ios-arrow-down" style={styles.titleIcon} />
        </Button>

        <View style={sg.row}>
          <Icon name="ios-help-circle-outline" style={styles.amountIcon} onPress={() => BottomInfo.showBalance({ selectedAccount, unitPrices })} />
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
