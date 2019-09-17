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

class Accounts extends React.PureComponent {
  componentDidMount() {
    const { userDataSaveConnect, appContentSaveConnect } = this.props;

    this.getAppContent((appContent) => {
      const { user } = appContent;
      const { screenProps } = this.props;
      userDataSaveConnect(user);
      appContentSaveConnect(appContent);
      // dev purpose
      // screenProps.navigateTo(routeNames.DATE_OF_BIRTH);
    });
  }

  onAccountSelect(account) {
    /*
    I wrote ProtectedRoutes (src/Common/ProtectedRoutes.js) hoc component which handles route for selected account globally.
    The idea behind it was to avoid writing checkers throughout application(ex. when user switches between accounts in the future)
    We can write all the checkers and appropriate redirects there.
    Saving selected account on this place is enough and the hoc will do the rest.
    */
    const { accountSelectSaveConnect } = this.props;
    accountSelectSaveConnect(account);
  }

  getAppContent(callback) {
    const { screenProps } = this.props;
    screenProps.Api.get('/appcontent', {}, callback, () => {
      screenProps.toast('Something went wrong. Please try refreshing your app, or contact us: hello@arrayapp.co');
    });
  }

  renderAccount = (account) => {
    if (account.status && account.status !== 'incompleteApp') {
      const displayName = account.nickName ? account.nickName : account.ownerName;
      const showBalance = account.balanceInDollars > 0;
      const awaitingIdCheck = (account.status === 'awaitingIdCheckAndMoney' || account.status === 'awaitingIdCheck');
      const appIncomplete = (account.status === 'incompleteApp');
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
                    {displayName}
                  </Text>
                  {showBalance && (
                    <Text style={[sg.mL0, sg.fS16]} color4>
                        {formatAmountDollarCent(account.balanceInDollars)}
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
    const { screenProps, accounts } = this.props;
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View>
            <View>
              <Text style={[sg.formHeading]}>Your accounts</Text>
            </View>
            <List>
              {accounts.map(account => this.renderAccount(account))}
            </List>
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
