
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View,
  FlatList,
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
import TextUnderline from 'src/Components/TextUnderline';
import {
  formatAmountDollarCent,
} from 'src/Common/Helpers';

import {
  accountsSelector,
} from 'src/Redux/AppContent';

import {
  sg,
} from 'src/Styles';

class ManageAccounts extends Component {
  openItem(item) {
    const { screenProps } = this.props;

    screenProps.navigateTo(routeNames.MANAGE_ACCOUNT_DETAILS, {
      details: item,
    });
  }

  renderIncApp() {
    return (
      <View style={sg.incAppBl}>
        <Text style={[sg.incAppText, sg.fS14]}>Incomplete application</Text>
      </View>
    );
  }

  renderItem({ item }) {
    let complete = true;

    item.complete = true;
    if (item.status !== 'unitsIssued') {
      complete = false;
      item.complete = false;
    }

    return (
      <ListItem
        button
        noIndent
        onPress={() => {
          this.openItem(item);
        }}
        style={[sg.pL0, sg.pT25, sg.pB25, sg.pR35]}
      >
        <Body>
          <Grid>
            <Row>
              <Col style={[sg.flexNull]}>
                <Text style={[sg.mL0, sg.mB10, sg.fS20, sg.textBold]} color2>{item.nickName}</Text>

                {complete && (
                  <Text style={[sg.mL0, sg.fS16]} color4>
                    Balance:&nbsp;
                    <Text color4>{formatAmountDollarCent(item.balanceInDollars)}</Text>
                  </Text>
                )}
              </Col>
              <Col style={[sg.jCCenter, sg.aIEnd]}>
                <Icon name="ios-arrow-forward" style={sg.fS20} />
              </Col>
            </Row>
            {!complete && (
              <Row style={[sg.jCSpaceBetween, sg.aICenter, sg.mT0]}>
                {this.renderIncApp()}
                <Text style={[sg.fS14, sg.fontMedium, sg.mR0]}>Resume</Text>
              </Row>
            )}
          </Grid>
        </Body>
      </ListItem>
    );
  }

  render() {
    const { accounts } = this.props;

    return (
      <Content contentContainerStyle={[sg.flexGrow, sg.pB220]}>

        <List style={[sg.contentMarginLeft, sg.mB50]}>
          <ListItem noIndent />

          <FlatList
            data={accounts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(...args) => this.renderItem(...args)}
          />
        </List>

        <View style={[sg.footerBl, sg.contentPadding, sg.aICenter]}>
          <H2 style={[sg.fS20]} color2>Add a new Account</H2>

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

          <TextUnderline
            style={sg.mT25}
            onPress={() => {
              BottomInfo.showFutureSuperAccount();
            }}
            theme
          >
            What&apos;s a Future Super Account?
          </TextUnderline>
        </View>
      </Content>
    );
  }
}

ManageAccounts.propTypes = {
  accounts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const accounts = accountsSelector(state);

  return {
    accounts,
  };
};

export default connect(mapStateToProps)(ManageAccounts);
