
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

        <View style={[styles.doneTextBl]}>
          <Text style={styles.doneText}>
            Confirming you&apos;d like to invest
            <Text style={styles.doneTextBold}> $20 monthly </Text>
            from your
            <Text style={styles.doneTextBold}> ING account </Text>
            starting on
            <Text style={styles.doneTextBold}> April 20.</Text>
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
