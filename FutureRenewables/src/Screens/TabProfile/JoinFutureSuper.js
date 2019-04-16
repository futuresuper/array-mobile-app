
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
} from 'native-base';

// eslint-disable-next-line react/prefer-stateless-function
class JoinFutureSuper extends Component {
  render() {
    return (
      <Content padder>
        <Text>Join Future Super</Text>
      </Content>
    );
  }
}

export default connect()(JoinFutureSuper);
