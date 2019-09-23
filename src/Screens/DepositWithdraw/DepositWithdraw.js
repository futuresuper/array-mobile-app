
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

import {
  sg,
} from 'src/Styles';

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

  render() {
    const { segment } = this.state;

    return (
      <Content padder contentContainerStyle={[sg.flexGrow]}>
        <Deposit
          ref={(ref) => {
            if (ref) this.Deposit = ref;
          }}
          {...this.props}
        />
      </Content>
    );
  }
}

export default connect()(DepositWithdraw);
