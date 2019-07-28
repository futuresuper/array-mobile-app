
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
        <View style={sg.spaceBetween}>
          <View>
            <View style={[sg.row]}>
              <Button
                transparent
                onPress={this.segmentDeposit}
                style={[sg.mT0, sg.pT0, sg.heightNull]}
              >
                <Text style={[styles.tabTextActive, (!segment.isDeposit ? styles.tabText : {})]}>Deposit</Text>
              </Button>

              <Button
                transparent
                onPress={this.segmentWithdraw}
                style={[sg.mT0, sg.pT0, sg.heightNull]}
              >
                <Text style={[styles.tabTextActive, sg.mL10, (!segment.isWithdraw ? styles.tabText : {})]}>Withdraw</Text>
              </Button>
            </View>

            {segment.isDeposit && (
              <Deposit
                ref={(ref) => {
                  if (ref) this.Deposit = ref;
                }}
                {...this.props}
              />
            )}
          </View>

          <View>
            {segment.isWithdraw
              && (
                <Text style={[sg.colorGray, sg.mB20]}>
                  Just a reminder that withdrawals can take up to 30 days to reach your account.
                  <Text style={sg.textBold}> Why?</Text>
                </Text>
              )
            }

            <Button
              block
              onPress={this.onNext}
            >
              <Text>{segment.isDeposit ? 'Next' : 'Confirm'}</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

export default connect()(DepositWithdraw);
