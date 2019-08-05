
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

import styles from './styles';

class DepositWithdrawDone extends Component {
  onConfirm = () => {
    const { navigation, screenProps } = this.props;
    const depositMessage = (
      <View style={[sg.row, sg.center]}>
        <Text style={[sg.fS16, sg.fontMedium]}>Deposit recieved.</Text>
        <Text style={[sg.fS16]}> Nice one!</Text>
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

        <View style={[styles.doneTextBl]}>
          <Text style={styles.doneText} color2>
            Confirming you&apos;d like to invest
            <Text style={styles.doneTextBold}> $20 </Text>
            from your linked bank account
          </Text>
        </View>

        <Button
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
