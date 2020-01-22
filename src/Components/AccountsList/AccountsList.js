
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
} from 'react-native';
import {
  Text,
  ListItem,
  Body,
  Grid,
  Row,
  Col,
  Icon,
  List,
} from 'native-base';

import { formatAmountDollar } from 'src/Common/Helpers';

import {
  accountsSelector,
} from 'src/Redux/AppContent';

import { sg } from 'src/Styles';

class AccountsList extends Component {
  renderItem = ({ item: account }) => {
    const { onItemPress } = this.props;

    if (account.status === 'incompleteApp') {
      return null;
    }

    let showBalance = false,
      showAwaitingDebit = false,
      awaitingIdCheck = false,
      appIncomplete = false;

    if (account.status === 'incompleteApp') {
      appIncomplete = true;
    } else if (account.status === 'awaitingIdCheckAndMoney' || account.status === 'awaitingIdCheck') {
      awaitingIdCheck = true;
    } else if (account.balanceInDollarsIncludingPending > 0) {
      showBalance = true;
    } else if (account.amountAwaitingDirectDebit > 0) {
      showAwaitingDebit = true;
    }

    return (
      <ListItem
        button
        noIndent
        key={account.id}
        onPress={() => onItemPress(account)}
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

  render() {
    const { accounts } = this.props;

    return (
      <List>
        <FlatList
          data={accounts}
          keyExtractor={({ id }) => id}
          renderItem={(...args) => this.renderItem(...args)}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      </List>
    );
  }
}

AccountsList.defaultProps = {
  onItemPress: () => null,
};

AccountsList.propTypes = {
  accounts: PropTypes.array.isRequired,
  onItemPress: PropTypes.func,
};

const mapStateToProps = (state) => {
  const accounts = accountsSelector(state);

  return {
    accounts,
  };
};

export default connect(
  mapStateToProps,
)(AccountsList);
