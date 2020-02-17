
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
    } = selectedAccount;
    let unitPrice = null;

    if (unitPrices.length > 0) {
      ([unitPrice] = unitPrices);
    }

    return (
      <Grid style={sg.mT15}>
        {this.renderInfoRow('Account', registryAccountNumber)}
        {this.renderInfoRow('Unit Balance', balanceInUnits)}
        {unitPrice && this.renderInfoRow('Unit Price', `${unitPrice.price} at ${moment(unitPrice.date).format('DD MMM YYYY')}`)}
        {this.renderInfoRow('Account Balance', `$${balanceExcludingPendingInDollars}`)}
        {this.renderInfoRow('Pending Transactions', `$${pendingTransactionsInDollars}`)}
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
              This number show your&nbsp;
              <Text style={[styles.textBold]}>Account Balance</Text>
              &nbsp;plus any&nbsp;
              <Text style={[styles.textBold]}>Pending Transactions</Text>
              &nbsp;for your currently selected account in the Future Renewables Fund.
            </Text>

            {this.renderAccountInfo()}

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
