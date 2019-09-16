
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
  formatAmountDollarCent,
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
    console.log("ACCOUNT: " + JSON.stringify(account));
    const { accountSelectSaveConnect } = this.props;
    accountSelectSaveConnect(account);
    BottomInfoModal.hide();
  }

  renderAccounts() {
    const { accounts, screenProps } = this.props;

    return accounts.map(account => account.status !== accountUtils.STATUS.INCOMPLETE_APP && (
      <ListItem
        button
        noIndent
        key={account.id}
        onPress={() => this.onAccountSelect(account)}
        style={[sg.pL0, sg.pT25, sg.pB25, sg.pR35]}
      >
        <Body>
          <Grid>
            <Row>
              <Col style={[sg.flexNull]}>
                <Text style={[sg.mL0, sg.mB10, sg.fS20, sg.textBold]} color2>{account.ownerName}</Text>

                {account.status === accountUtils.STATUS.UNITS_ISSUED && account.balance && (
                  <Text style={[sg.mL0, sg.fS16]} color4>
                    Balance:&nbsp;
                    <Text color4>
                      {formatAmountDollarCent(account.balance)}
                    </Text>
                  </Text>
                )}
              </Col>
              <Col style={[sg.jCCenter, sg.aIEnd]}>
                <Icon name="ios-arrow-forward" style={sg.fS20} />
              </Col>
            </Row>

          </Grid>

        </Body>
      </ListItem>
    ));
  }

  render() {
    const { superAccount } = false; // this.props;
    const { screenProps } = this.props;
    const { list } = this.state;

    return (
      <View style={sg.mH5}>
        <List>
          {this.renderAccounts()}
        </List>

        <View style={[sg.mT30, sg.mH10]}>
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

          {superAccount && (
            <View>
              <Button
                transparent
                bordered
                dark
                block
                style={sg.mT15}
              >
                <Text>Future Super Account</Text>
              </Button>

              <TextUnderline style={[sg.mT25]}>What&apos;s a Future Super Account?</TextUnderline>
            </View>
          )}
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
