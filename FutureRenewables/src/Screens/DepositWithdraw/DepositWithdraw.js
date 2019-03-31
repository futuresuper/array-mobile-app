
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
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

  render() {
    const { segment } = this.state;

    return (
      <Content padder>
        <View style={[sg.row]}>
          <Button
            transparent
            onPress={this.segmentDeposit}
            style={[sg.mT0, sg.pT0, sg.heightNull]}
          >
            <Text style={[sg.pT0, sg.pL0, (segment.isDeposit ? {} : sg.colorGray)]}>Perfomance</Text>
          </Button>

          <Button
            transparent
            onPress={this.segmentWithdraw}
            style={[sg.mT0, sg.pT0, sg.heightNull]}
          >
            <Text style={[sg.pL0, (segment.isWithdraw ? {} : sg.colorGray)]}>Investment</Text>
          </Button>
        </View>

        <Deposit />
      </Content>
    );
  }
}

export default connect()(DepositWithdraw);
