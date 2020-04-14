
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  H2,
  Grid,
  Row,
} from 'native-base';

import moment from 'src/Common/moment';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

class BalanceInfo extends Component {
  renderInfoRow(textLeft, textRight) {
    return (
      <Row>
        <Text style={styles.textBold}>
          {`${textLeft}:`}
          &nbsp;
        </Text>
        <Text style={styles.text}>{textRight}</Text>
      </Row>
    );
  }

  renderAccountInfo() {
    const { selectedAccount, unitPrices } = this.props;

    if (
      !selectedAccount
      || _.isEmpty(selectedAccount)
    ) {
      return null;
    }

    const {
      registryAccountNumber,
      balanceInUnits,
      balanceExcludingPendingInDollars,
      pendingTransactionsInDollars,
      amountAwaitingDirectDebit
    } = selectedAccount;
    let unitPrice = null;

    if (unitPrices.length > 0) {
      ([unitPrice] = unitPrices);
    }

    return (
      <Grid style={sg.mT15}>
        {registryAccountNumber ? this.renderInfoRow('Account', registryAccountNumber) : null}
        {balanceInUnits ? this.renderInfoRow('Unit Balance', balanceInUnits.toFixed(4)) :this.renderInfoRow('Unit Balance', 0) }
        {unitPrice && this.renderInfoRow('Unit Price', `${unitPrice.price} at ${moment(unitPrice.date).format('DD MMM YYYY')}`)}
        {balanceExcludingPendingInDollars > 1 ? this.renderInfoRow('Account Balance', `$${balanceExcludingPendingInDollars.toFixed(2)}`) : this.renderInfoRow('Account Balance', `$0`)}
        { /* pendingTransactionsInDollars ? this.renderInfoRow('Pending Transactions', `$${pendingTransactionsInDollars.toFixed(2)}`) : this.renderInfoRow('Pending Transactions', `$0`) */}
        { /* amountAwaitingDirectDebit ? this.renderInfoRow('Awaiting Direct Debit', `$${amountAwaitingDirectDebit.toFixed()}`) : null */}
      </Grid>
    );
  }

  render() {
    return (
      <View style={sg.mH5}>
        <H2 style={[sg.fS20, sg.colorDark2textCenter, sg.mL5]}>
          About your balance
        </H2>

        <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            activeOpacity={1}
          >
            <Text style={[styles.text, sg.mT15]}>
              This number show your Account Balance plus any Pending Transactions and
              amounts Awaiting Direct Debit for your currently selected account in the Future Renewables Fund.
            </Text>

            <Text style={[styles.text, sg.mT15]}>
              Here is a full breakdown of your balance:
            </Text>

            {this.renderAccountInfo()}

            <Text style={[styles.text, sg.mT15]}>
              The Fund's Unit Price is updated monthly.
            </Text>

            <Text style={[styles.text, sg.mT15]}>
              Pending Transactions are your application monies that have been received by us,
              where that application hasn’t yet been processed, and converted into units in the Fund.
            </Text>

            <Text style={[styles.text, sg.mT15]}>
              While every effort is made that this information is correct,
              you should check that it is consistent with your own records.
              We have the right to correct any error or omission.
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

BalanceInfo.defaultProps = {
  selectedAccount: null,
  unitPrices: [],
};

BalanceInfo.propTypes = {
  selectedAccount: PropTypes.object,
  unitPrices: PropTypes.array,
};

export default BalanceInfo;
