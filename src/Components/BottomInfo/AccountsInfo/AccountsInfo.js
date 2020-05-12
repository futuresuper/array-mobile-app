
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import {
  Button,
  Icon,
  Grid,
  List,
  ListItem,
  Row,
  Col,
  Body,
  Text,
} from 'native-base';

import {
  accountsSelector,
} from 'src/Redux/AppContent';

import {
  routeNames,
} from 'src/Navigation';

import {
  formatAmountDollarCent, formatAmountDollar,
} from 'src/Common/Helpers';
import accountUtils from 'src/Common/account';

import TextUnderline from 'src/Components/TextUnderline';
import {
  sg,
} from 'src/Styles';

import { accountSelectSave } from 'src/Redux/Account';

import BottomInfoModal from 'src/Components/BottomInfo';

class AccountsInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  onAccountSelect(account) {
    const { accountSelectSaveConnect } = this.props;
    accountSelectSaveConnect(account);
    BottomInfoModal.hide();
  }

  renderAccount = (account) => {
    if (account.status !== 'incompleteApp') {
      let showBalance = false,
        showAwaitingDebit = false,
        awaitingIdCheck = false,
        appIncomplete = false;
      if (account.status === 'incompleteApp') { appIncomplete = true; } else if (account.status === 'awaitingIdCheckAndMoney' || account.status === 'awaitingIdCheck') { awaitingIdCheck = true; } else if (account.balanceInDollarsIncludingPending > 0) { showBalance = true; } else if (account.amountAwaitingDirectDebit > 0) { showAwaitingDebit = true; }

      return (
        <ListItem
          button
          noIndent
          key={account.id}
          onPress={() => this.onAccountSelect(account)}
          style={[sg.pL0, sg.pT25, sg.pB25]}
        >
          <Body>
            <Grid>
              <Row>
                <Col style={[sg.flexNull]}>
                  <Text style={[sg.mL0, sg.mB10, sg.fS20, sg.textBold]} color2>
                    {account.nickName}
                  </Text>
                </Col>
                <Col style={[sg.jCCenter, sg.aIEnd]}>
                  <Icon name="ios-arrow-forward" style={sg.fS20} />
                </Col>
              </Row>
            </Grid>
          </Body>
        </ListItem>
      );
    }
    return null;
  }

  renderNoAccounts() {
      return (
        <View style={sg.pH20}>
            <Text style={[sg.textCenter, sg.textBold]}>
                YOUR ACCOUNTS
            </Text>
        </View>
      )
  }

  render() {
    const { superAccount, screenProps, accounts } = this.props;
    const { list } = this.state;

    return (
      <View style={sg.mH5}>
        <List>
          {accounts.map((account) => this.renderAccount(account))}
          {accounts.length === 0 && this.renderNoAccounts()}
        </List>
      </View>
    );
  }
}

AccountsInfo.defaultProps = {
  superAccount: true,
};

AccountsInfo.propTypes = {
  superAccount: PropTypes.bool,
  accounts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const accounts = accountsSelector(state);
  return {
    accounts,
  };
};

const mapDispatchToProps = {
  accountSelectSaveConnect: accountSelectSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountsInfo);
