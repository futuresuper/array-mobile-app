
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Button,
  Text,
  Content,
} from 'native-base';

import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';

import {
  sg,
} from 'src/Styles';
import {
  routeNames,
} from 'src/Navigation';
import Deposit from './Deposit';

import styles from './styles';

class DepositWithdraw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      segment: {
        isDeposit: true,
        isWithdraw: false,
      },
    };
  }

  segmentDeposit = () => {
    this.setState({
      segment: {
        isDeposit: true,
        isWithdraw: false,
      },
    });
  }

  segmentWithdraw = () => {
    this.setState({
      segment: {
        isDeposit: false,
        isWithdraw: true,
      },
    });
  }

  onNext = () => {
    const { segment } = this.state;
    if (segment.isDeposit) {
      this.Deposit.onNext();
    } else {
      this.Withdraw.onNext();
    }
  }

  renderContinueApp() {
    const { screenProps } = this.props;
    return (
      <View style={sg.spaceBetween}>
        <View>
          <Text style={[sg.formHeading]}>
          Before you make a deposit...
          </Text>
          <Text>
            Before you make a deposit, we need some extra details to complete your application and ID check.
          </Text>
        </View>
        <KeyboardAvoidingView>
          <Button
            onPress={() => {
              screenProps.navigateTo(routeNames.ABOUT_APP_FORM);
            }}
            block
          >
            <Text>Complete an application</Text>
          </Button>
        </KeyboardAvoidingView>
      </View>
    )
  }

  render() {
    const { segment } = this.state;
    const { screenProps } = this.props;
    const { account } = screenProps;
    return (
      <Content padder contentContainerStyle={[sg.flexGrow]}>

        {account.id && <Deposit
          ref={(ref) => {
            if (ref) this.Deposit = ref;
          }}
          {...this.props}
        />}

        {!account.id && this.renderContinueApp()}

      </Content>
    );
  }
}

export default connect()(DepositWithdraw);
