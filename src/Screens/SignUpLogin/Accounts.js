import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  Button, Content, Text, Icon, Grid, Row, Col, ListItem, Body,
} from 'native-base';

import { routeNames } from 'src/Navigation';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
import { formatAmountDollarCent } from 'src/Common/Helpers';
import { userDataSave } from 'src/Redux/Auth';
import { appContentSave, accountsSelector } from 'src/Redux/AppContent';
import accountUtils from 'src/Common/account';

import { sg } from 'src/Styles';

class Accounts extends React.Component {
  componentDidMount() {
    const { userDataSaveConnect, appContentSaveConnect } = this.props;

    this.getAppContent((appContent) => {
      const { user } = appContent;
      const { screenProps } = this.props;
      userDataSaveConnect(user);
      appContentSaveConnect(appContent);
      if (user.personalDetailsLocked) {
        screenProps.navigateTo(routeNames.ABOUT_APP_FORM);
      }
      // dev purpose
      // this.nextScreen
      screenProps.navigateTo(routeNames.DATE_OF_BIRTH);
    });
  }

  getAppContent(callback) {
    const { screenProps } = this.props;
    screenProps.Api.get('/appcontent', {}, callback, () => {
      screenProps.toast('Something went wrong. Please try refreshing your app, or contact us: hello@arrayapp.co');
    });
  }

  renderAccounts() {
    const { accounts, screenProps } = this.props;

    // console.log(accounts);
    // let activeAccounts = 0;
    // for (let i = 0; i < accounts.length; i += 1) {
    //   if (accounts[i].status === accountUtils.STATUS.UNITS_ISSUED) {
    //     activeAccounts += 1;
    //   }
    // }
    // if (activeAccounts > 0) {
    if (true) {
      return accounts.map((account) => {
        // if (account.status === accountUtils.STATUS.UNITS_ISSUED) {
        if (true) {
          return (
            <ListItem
              button
              noIndent
              key={account.id}
              onPress={() => {
                if (account.status === 'awaitingIdCheckAndMoney' || account.status === 'awaitingIdCheck') {
                  screenProps.navigateTo(routeNames.ID_CHECK, {
                    accountId: account.id,
                  });
                } else {
                  // Navigate to the Home screen with the selected Account Active
                  // PK2 is the Account ID
                  screenProps.navigateTo(routeNames.TAB_HOME, {
                    accountId: account.id,
                  });
                }
              }}
              style={[sg.pL0, sg.pT25, sg.pB25, sg.pR35]}
            >
              <Body>
                <Grid>
                  <Row>
                    <Col style={[sg.flexNull]}>
                      <Text style={[sg.mL0, sg.mB10, sg.fS20, sg.textBold]} color2>
                        {account.ownerName}
                      </Text>
                      {account.balanceInDollars !== 0 && (
                        <Text style={[sg.mL0, sg.fS16]} color4>
                          Balance:&nbsp;
                          <Text color4>{formatAmountDollarCent(account.balanceInDollars)}</Text>
                        </Text>
                      )}
                      {(account.status === 'awaitingIdCheckAndMoney' || account.status === 'awaitingIdCheck') && (
                        <Text style={[sg.mL0, sg.fS16]} color4>
                          Complete ID Check
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
          );
        }
        return null;
      });
    }

    return (
      <Text>
        {"You don't have any accounts yet :(\n\nThe good news is you'll have the ability to start an account via the Array app very soon!"}
      </Text>
    );
  }

  render() {
    const { screenProps } = this.props;
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading]}>Your accounts</Text>
            {this.renderAccounts()}
          </View>
          {__DEV__ && (
            <KeyboardAvoidingView>
              <Button
                onPress={() => {
                  screenProps.navigateTo(routeNames.ABOUT_APP_FORM);
                  // screenProps.navigateTo(routeNames.FINAL_CONFIRMATION);
                }}
                block
              >
                <Text>Start new application</Text>
              </Button>
            </KeyboardAvoidingView>
          )}
        </View>
      </Content>
    );
  }
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  userDataSaveConnect: PropTypes.func.isRequired,
  appContentSaveConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const accounts = accountsSelector(state);
  return {
    accounts,
  };
};

const mapDispatchToProps = {
  userDataSaveConnect: userDataSave,
  appContentSaveConnect: appContentSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Accounts);
