
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Button,
  Content,
  Text,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

// eslint-disable-next-line react/prefer-stateless-function
class DepositWithdrawDone extends Component {

  onConfirm = () => {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.TAB_ACTIVITY, {
      depositMessage: 'asd',
    });
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.spaceBetween}>
        <Text style={sg.fS23}>
          Confirming you&apos;d like to invest
          <Text style={[sg.textBold, sg.fS23]}> $20 monthly </Text>
          from your
          <Text style={[sg.textBold, sg.fS23]}> ING account </Text>
          starting on
          <Text style={[sg.textBold, sg.fS23]}> April 20 </Text>
        </Text>

        <Button
          gray4
          block
          style={sg.m20}
          onPress={this.onConfirm}
        >
          <Text>Confirm</Text>
        </Button>
      </Content>
    );
  }
}

export default connect()(DepositWithdrawDone);
