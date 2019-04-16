
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
} from 'native-base';

// eslint-disable-next-line react/prefer-stateless-function
class ReferFriend extends Component {
  render() {
    return (
      <Content padder>
        <Text>Refer a friend</Text>
      </Content>
    );
  }
}

export default connect()(ReferFriend);

