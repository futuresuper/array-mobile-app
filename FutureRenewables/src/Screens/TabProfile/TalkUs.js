
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
} from 'native-base';

// eslint-disable-next-line react/prefer-stateless-function
class TalkUs extends Component {
  render() {
    return (
      <Content padder>
        <Text>Talk to us</Text>
      </Content>
    );
  }
}

export default connect()(TalkUs);
