
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
                  {showBalance && (
                    <Text style={[sg.mL0, sg.fS16]} color4>
                        {formatAmountDollar(account.balanceInDollars)}
                    </Text>
                  )}
                  {showAwaitingDebit && (
                    <Text style={[sg.mL0, sg.fS16]} color4>
                        {formatAmountDollar(account.amountAwaitingDirectDebit)}
                        {' '}
                        awaiting debit
                    </Text>
                  )}
                </Col>
                <Col style={[sg.jCCenter, sg.aIEnd]}>
                  <Icon name="ios-arrow-forward" style={sg.fS20} />
                </Col>
              </Row>
              {awaitingIdCheck && (
                <Row>
                  <Col style={[sg.flexNull]}>
                    <View style={[sg.incAppBl, sg.aSCenter]}>
                      <Text style={[sg.incAppText]}>Complete ID Check</Text>
                    </View>
                  </Col>
                </Row>
              )}
              {appIncomplete && (
                <Row>
                  <Col style={[sg.flexNull]}>
                    <View style={[sg.incAppBl, sg.aSCenter]}>
                      <Text style={[sg.incAppText]}>Incomplete application</Text>
                    </View>
                  </Col>
                </Row>
              )}
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
            <Text style={[sg.textCenter,sg.pT10]}>
                Your accounts will show up here once you've set them up.
            </Text>
            <Text style={[sg.textCenter,sg.pT10]}>
                With Array, you can have multiple accounts if you want to.
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

        <View style={[sg.mT30, sg.mH10]}>
          {/*
          <Button
            block
            iconRight
            onPress={() => {
              screenProps.navigateTo(routeNames.ABOUT_APP_FORM);
              BottomInfoModal.hide();
            }}
          >
            <Text>Add account</Text>
            <Icon name="add" />
          </Button>
          */}

          {
          //   superAccount && (
          //   <View>
          //     <Button
          //       transparent
          //       bordered
          //       dark
          //       block
          //       style={sg.mT15}
          //       onPress={() => {
          //         screenProps.navigateTo(routeNames.JOIN_FUTURE, {
          //           showBackButton: false,
          //         });
          //         BottomInfoModal.hide();
          //       }}
          //     >
          //       <Text>Add Future Super Account</Text>
          //     </Button>
          //     <TextUnderline style={[sg.mT25]}>What&apos;s a Future Super Account?</TextUnderline>
          //   </View>
          // )
          }
        </View>
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
