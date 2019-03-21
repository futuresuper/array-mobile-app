
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
  styleGlobal,
} from 'src/Styles';

// eslint-disable-next-line react/prefer-stateless-function
class DepositWithdraw extends Component {
  render() {
    return (
      <Content>
        <Text>deposit</Text>
      </Content>
    );
  }
}

export default connect()(DepositWithdraw);
