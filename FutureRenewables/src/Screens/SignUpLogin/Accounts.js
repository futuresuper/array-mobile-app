import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  View,
} from 'react-native';

import {
  Button,
  Content,
  Text,
  Icon,
  Grid,
  Row,
  Col,
  ListItem,
  Body,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
import {
  formatAmountDollarCent,
} from 'src/Common/Helpers';

import {
  accountsSelector,
} from 'src/Redux/AppContent';

import {
  sg,
} from 'src/Styles';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  renderAccounts() {
      const { accounts, screenProps } = this.props;
      const { user } = this.state;

      console.log("Accounts: " + JSON.stringify(accounts));

      /*
      if (_.isNil(user) || _.isEmpty(user)) {
        return null;
      }
      */

      return accounts.map((account) => {


        /*
        return (
          <Text>
            {account.id} | {account.nickName} | {account.balance} | {account.status}
          </Text>
        )
        */


        return (
            <ListItem
              button
              noIndent
              key={account.id}
              onPress={() => {
                // Navigate to the Home screen with the selected Account Active
                // PK2 is the Account ID
                screenProps.navigateTo(routeNames.TAB_HOME, {
                  details: account.id,
                });
              }}
              style={[sg.pL0, sg.pT25, sg.pB25, sg.pR35]}
            >
              <Body>

                <Grid>
                  <Row>
                    <Col style={[sg.flexNull]}>

                      <Text style={[sg.mL0, sg.mB10, sg.fS20, sg.textBold]} color2>{account.nickName}</Text>

                      {account.status === 'unitsIssued' && account.balance && (
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
          );

      });

  }

  render() {
    const { screenProps } = this.props;

    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading]}>
              Your accounts
            </Text>
            {
              this.renderAccounts()
            }
          </View>
          <KeyboardAvoidingView>
            <Button
              onPress={() => {
                screenProps.navigateTo(routeNames.ABOUT_APP_FORM);
              }}
              block
            >
              <Text>Start new application</Text>
            </Button>
          </KeyboardAvoidingView>
        </View>
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  const accounts = accountsSelector(state);

  return {
    accounts,
  };
};

export default connect(mapStateToProps)(Accounts);
