
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
  sg,
} from 'src/Styles';

class DepositWithdrawDone extends Component {
  onConfirm = () => {
    const { navigation, screenProps } = this.props;
    const depositMessage = (
      <View style={[sg.row, sg.center]}>
        <Text style={sg.fS15}>Deposit recieved.</Text>
        <Text style={[sg.fS15, sg.colorGray7]}> Nice one Grace!</Text>
      </View>
    );

    screenProps.toast(depositMessage, {
      iconName: 'ios-checkmark-circle',
    });

    navigation.popToTop();
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
