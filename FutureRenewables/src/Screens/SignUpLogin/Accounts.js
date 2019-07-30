/*

TO DO TONIGHT

- Add entity accounts to the list. Add Account Num data to the GET to make it easy
- Put screen order back to how it was
- Pull request for Alexander
- Trello ticket to move the GET to the verification code and skip Accounts page if no accounts?

*/



import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';

import {
  Button,
  Content,
  Text,
  Icon,
  H2,
  Grid,
  Row,
  Col,
  List,
  ListItem,
  Body,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';
import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';

import {
  sg,
} from 'src/Styles';

import { API } from "aws-amplify";

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async componentDidMount() {
    const { screenProps } = this.props;

    try {
      const result = await API.get("array", "/user");

      // TO DO - Add Entity Accounts to list - result.user.linkedEntities[i].entity.accounts
      if (result.user.totalAccounts > 0) {
        console.log(result.user);
        this.setState({
          user: result.user
        })
      } else {
        console.log("No Accounts");
      }
    } catch (e) {
      console.log("Error: " + e);
    }
  }

  renderAccounts() {

    const { screenProps } = this.props;

    // Combining Individual and Linked Entity Accounts into a single array
    let individualAccounts = [];
    let entityAccounts = [];

    if ( this.state.user.accounts !== undefined && this.state.user.numberOfIndividualAccounts > 0 ) {
      individualAccounts = this.state.user.accounts;
    }

    if ( this.state.user.linkedEntities !== undefined && this.state.user.numberOfLinkedEntityAccounts > 0 ) {
      let linkedEntities = this.state.user.linkedEntities;
      for (let i = 0; i < linkedEntities.length; i++) {
        entityAccounts = entityAccounts.concat(linkedEntities[i].entity.accounts);
      }
    }

    const accounts = [...individualAccounts, ...entityAccounts];

    return accounts.map(
      (account, i) =>
        {
            return (
              <ListItem
                button
                noIndent
                key={account.PK2}
                onPress={() => {
                  // Navigate to the Home screen with the selected Account Active
                  // PK2 is the Account ID
                  screenProps.navigateTo(routeNames.TAB_HOME, {
                    details: account.PK2,
                  });
                }}
                style={[sg.pL0, sg.pT25, sg.pB25, sg.pR35]}
              >
                <Body>
                  <Grid>
                    <Row>
                      <Col style={[sg.flexNull]}>
                        <Text style={[sg.mL0, sg.mB10, sg.fS20, sg.textBold]} color2>{account.nickName}</Text>

                        {account.status === "unitsIssued" && (
                          <Text style={[sg.mL0, sg.fS16]} color4>
                            Balance:&nbsp;
                            <Text color4>
                              {account.balance.toLocaleString('en-AU', {
                                  style: 'currency',
                                  currency: 'AUD',
                                })
                              }
                            </Text>
                          </Text>
                        )}
                      </Col>
                      <Col style={[sg.jCCenter, sg.aIEnd]}>
                        <Icon name="ios-arrow-forward" style={sg.fS20} />
                      </Col>
                    </Row>

                    { /*
                      TO DO LATER - ADD INCOMPLETE APPS TO LIST

                      account.status === "incompleteApp" && (
                      <Row style={[sg.jCSpaceBetween, sg.aICenter, sg.mT0]}>
                        {this.renderIncApp()}
                        <Text style={[sg.fS14, sg.fontMedium, sg.mR0]}>Resume</Text>
                      </Row>
                      )
                    */}

                  </Grid>
                </Body>
              </ListItem>
            )
        }
    );

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
            { this.renderAccounts() }
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

export default connect()(Accounts);
