import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  Button, Content, Text, Icon, Grid, Row, Col, List, ListItem, Body,
} from 'native-base';

import { routeNames } from 'src/Navigation';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
import { formatAmountDollarCent } from 'src/Common/Helpers';
import { userDataSave } from 'src/Redux/Auth';
import { appContentSave, accountsSelector } from 'src/Redux/AppContent';
import { accountSelectSave } from 'src/Redux/Account';

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
      // screenProps.navigateTo(routeNames.INITIAL_INVESTMENT_AMOUNT);
    });
  }

  onAccountSelect(account) {
    const { accountSelectSaveConnect } = this.props;
    accountSelectSaveConnect(account);

    // const { screenProps } = this.props;
    // screenProps.Api.get(`/accounts/${id}`, {}, (account) => {
    //   accountSelectAction(account);
    // }, () => {
    //   screenProps.toastDanger('Something went wrong. Try Again');
    // });

    // if (!account.complete) {
    //   screenProps.navigateTo(routeNames.ACCOUNT_TYPE, {
    //     accountId: account.id,
    //   });
    // } else {
    //   screenProps.navigateTo(routeNames.TAB_HOME, {
    //     accountId: account.id,
    //   });
    // }
  }

  getAppContent(callback) {
    const { screenProps } = this.props;
    screenProps.Api.get('/appcontent', {}, callback, () => {
      screenProps.toast('Something went wrong. Please try refreshing your app, or contact us: hello@arrayapp.co');
    });
  }


  renderAccount = account => (
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
                {account.ownerName}
              </Text>
              <Text style={[sg.mL0, sg.fS16]} color4>
                  Balance:&nbsp;
                <Text color4>
                  {formatAmountDollarCent(account.balanceInDollars)}
                </Text>
              </Text>
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
          {!account.complete && (
            <Row>
              <Col style={[sg.flexNull]}>
                <View style={[sg.incAppBl, sg.aSCenter]}>
                  <Text style={[sg.incAppText]}>Incomplete application</Text>
                </View>
              </Col>
              <Col style={sg.aIEnd}>
                <Text style={[sg.textBold]}>Resume</Text>
              </Col>
            </Row>
          )}
        </Grid>
      </Body>
    </ListItem>
  )


  render() {
    const { screenProps, accounts } = this.props;
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading]}>Your accounts</Text>
          </View>
          <List>
            {accounts.map(account => this.renderAccount(account))}
          </List>
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
  accountSelectSaveConnect: PropTypes.func.isRequired,
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
  accountSelectSaveConnect: accountSelectSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Accounts);
