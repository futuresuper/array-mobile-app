import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';

// import PushNotification from 'react-native-push-notification';

import {
  Button, Content, Text, Icon, Grid, Row, Col, List, ListItem, Body,
} from 'native-base';

import { routeNames } from 'src/Navigation';
import { formatAmountDollar } from 'src/Common/Helpers';
import { userDataSave } from 'src/Redux/Auth';
import { appContentSave, accountsSelector, userSelector } from 'src/Redux/AppContent';
import { accountSelectSave } from 'src/Redux/Account';
import SafeAreaView from 'src/Components/SafeAreaView';

import { sg } from 'src/Styles';

class Accounts extends React.Component {
  componentDidMount() {
    const { userDataSaveConnect, appContentSaveConnect, screenProps } = this.props;
    // screenProps.navigateTo(routeNames.NAME); // dev purpose
    this.getAppContent((appContent) => {
      const { user } = appContent;
      userDataSaveConnect(user);
      appContentSaveConnect(appContent);
      screenProps.spinnerHide();
    });
  }

  onAccountSelect(account) {
    const { accountSelectSaveConnect, screenProps } = this.props;
    // Route is changed in ProtectedRoutes (src/Common/ProtectedRoutes.js)
    accountSelectSaveConnect(account);
    screenProps.navigateTo(routeNames.TAB_HOME);
  }


  getAppContent(callback) {
    const { screenProps } = this.props;
    screenProps.Api.get('/appcontent', {}, callback, () => {
      screenProps.navigateTo(routeNames.APP_LANDING);
    });
  }

  renderAccount = (account) => {
    if (account.status !== 'incompleteApp') {
      let showBalance = false,
        showAwaitingDebit = false,
        showAwaitingMoney = false,
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
                      {' awaiting debit'}
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

  render() {
    const { screenProps, accounts, user } = this.props;
    return (
      <SafeAreaView themeMode={screenProps.themeMode} forceInset={{ top: 'never' }}>
        <Content padder contentContainerStyle={sg.flexGrow}>
          <View style={sg.spaceBetween}>
            <View>
              <View>
                <Text style={[sg.formHeading]}>Your accounts</Text>
              </View>
              <List>
                {accounts.map((account) => this.renderAccount(account))}
              </List>
            </View>
            <View>
              <Button
                onPress={() => {
                  screenProps.navigateTo(routeNames.ABOUT_APP_FORM);
                }}
                block
              >
                <Text>Start new application</Text>
              </Button>
              { !user.personalDetailsLocked // exclude users that have already submitted an application
              && (
                <Button
                  onPress={() => {
                    screenProps.navigateTo(routeNames.TAB_HOME);
                  }}
                  bordered
                  dark
                  block
                  marginVert
                >
                  <Text>Explore Array</Text>
                </Button>
              )}
            </View>
          </View>
        </Content>
      </SafeAreaView>
    );
  }
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  userDataSaveConnect: PropTypes.func.isRequired,
  appContentSaveConnect: PropTypes.func.isRequired,
  accountSelectSaveConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const accounts = accountsSelector(state);
  const user = userSelector(state);
  return {
    accounts,
    user,
  };
};

const mapDispatchToProps = {
  userDataSaveConnect: userDataSave,
  appContentSaveConnect: appContentSave,
  accountSelectSaveConnect: accountSelectSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Accounts);
