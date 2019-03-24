
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Content,
  Text,
} from 'native-base';


// eslint-disable-next-line react/prefer-stateless-function
class DepositWithdrawDone extends Component {
  render() {
    return (
      <Content>
        <Text>done</Text>
      </Content>
    );
  }
}

export default connect()(DepositWithdrawDone);
