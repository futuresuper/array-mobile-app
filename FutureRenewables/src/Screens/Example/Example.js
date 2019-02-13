
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  Content,
} from 'native-base';


class Example extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Content>
        <Text>example</Text>
      </Content>
    );
  }
}

export default connect()(Example);
