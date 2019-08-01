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
  sg,
} from 'src/Styles';

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    const { screenProps } = this.props;

    screenProps.Api.get('/user', {},
      (res) => {
        // TO DO - Add Entity Accounts to list - result.user.linkedEntities[i].entity.accounts
        if (res.user.totalAccounts > 0) {
          this.setState({
            user: res.user,
          });
        }
      },
      () => {
        screenProps.toastDanger('Unknown error');
      });
  }

  renderAccounts() {
    const { screenProps } = this.props;
    const { user } = this.state;

    if (_.isNil(user) || _.isEmpty(user)) {
      return null;
    }

    // Combining Individual and Linked Entity Accounts into a single array
    let individualAccounts = [];
    let entityAccounts = [];
    const {
      linkedEntities,
      accounts,
      numberOfIndividualAccounts,
      numberOfLinkedEntityAccounts,
    } = user;

    if (accounts !== undefined && numberOfIndividualAccounts > 0) {
      individualAccounts = accounts;
    }

    if (linkedEntities !== undefined && numberOfLinkedEntityAccounts > 0) {
      for (let i = 0; i < linkedEntities.length; i += 1) {
        entityAccounts = entityAccounts.concat(linkedEntities[i].entity.accounts);
      }
    }

    const accountsNew = [...individualAccounts, ...entityAccounts];

    return accountsNew.map((account) => {
      const {
        PK2,
        nickName,
        status,
        balance,
      } = account;

      return (
        <ListItem
          button
          noIndent
          key={PK2}
          onPress={() => {
            // Navigate to the Home screen with the selected Account Active
            // PK2 is the Account ID
            screenProps.navigateTo(routeNames.TAB_HOME, {
              details: PK2,
            });
          }}
          style={[sg.pL0, sg.pT25, sg.pB25, sg.pR35]}
        >
          <Body>
            <Grid>
              <Row>
                <Col style={[sg.flexNull]}>
                  <Text style={[sg.mL0, sg.mB10, sg.fS20, sg.textBold]} color2>{nickName}</Text>

                  {status === 'unitsIssued' && (
                    <Text style={[sg.mL0, sg.fS16]} color4>
                      Balance:&nbsp;
                      <Text color4>
                        {formatAmountDollarCent(balance)}
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
            {this.renderAccounts()}
          </View>
          <KeyboardAvoidingView>
            <Button
              onPress={() => {
                screenProps.navigateTo(routeNames.ABOUT_APP_FORM);
                // screenProps.navigateTo(routeNames.TAB_HOME);
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
