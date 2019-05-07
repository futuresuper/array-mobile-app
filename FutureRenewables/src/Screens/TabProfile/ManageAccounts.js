
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  FlatList,
  TouchableOpacity,
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

import BottomInfo from 'src/Components/BottomInfo';

import {
  sg,
} from 'src/Styles';

class ManageAccounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
    };
  }

  componentDidMount() {
    this.setAccounts();
  }

  setAccounts() {
    const { screenProps } = this.props;
    const userInfo = screenProps.userInfo();

    let accounts = userInfo.accounts || [];

    if (userInfo.entities_linked_to && Array.isArray(userInfo.entities_linked_to)) {
      userInfo.entities_linked_to.forEach((item) => {
        if (item.accounts && Array.isArray(item.accounts)) {
          accounts = [...accounts, ...item.accounts];
        }
      });
    }

    this.setState({
      accounts,
    });
  }

  openItem(item) {
    const { screenProps } = this.props;

    screenProps.navigateTo(routeNames.MANAGE_ACCOUNT_DETAILS, {
      details: item,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderIncApp() {
    return (
      <View style={sg.incAppBl}>
        <Text style={[sg.fS14]}>Incomplete application</Text>
      </View>
    );
  }

  renderItem({ item }) {
    const complete = true;

    return (
      <ListItem
        button
        noIndent
        onPress={() => {
          this.openItem(item);
        }}
        style={sg.pL0}
      >
        <Body>
          <Grid>
            <Row>
              <Col>
                <Text style={[sg.mL0, sg.mB5, sg.fS22]}>{item.accountNickName}</Text>

                {complete && (
                  <Text style={[sg.mL0, sg.fS14]}>
                    Balance:&nbsp;
                    <Text>{item.balanceDollars}</Text>
                  </Text>
                )}
              </Col>
              <Col style={[sg.jCCenter, sg.aIEnd]}>
                {complete && <Icon name="ios-arrow-forward" style={sg.fS20} />}
              </Col>
            </Row>
            {!complete && (
              <Row style={[sg.jCSpaceBetween, sg.aICenter, sg.mT5]}>
                {this.renderIncApp()}
                <Text style={[sg.fS14, sg.mR0]}>Resume</Text>
              </Row>
            )}
          </Grid>
        </Body>
      </ListItem>
    );
  }

  render() {
    const { accounts } = this.state;

    return (
      <Content padder contentContainerStyle={[sg.flexGrow, sg.pB220]}>

        <List>
          <ListItem noIndent />

          <FlatList
            data={accounts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(...args) => this.renderItem(...args)}
          />
        </List>

        <View style={[sg.footerBl, sg.contentPadding, sg.aICenter]}>
          <H2>Add a new Account</H2>

          <Button
            bordered
            dark
            block
            style={[sg.mT20, sg.mB10]}
          >
            <Text>Array account</Text>
          </Button>

          <Button
            bordered
            dark
            block
          >
            <Text>Future Super Account</Text>
          </Button>


          <TouchableOpacity
            style={sg.whatIsAccountBl}
            onPress={() => {
              BottomInfo.showFutureSuperAccount();
            }}
          >
            <Text style={sg.whatIsAccount}>What&apos;s a future super Account?</Text>
          </TouchableOpacity>
        </View>
      </Content>
    );
  }
}

export default connect()(ManageAccounts);
