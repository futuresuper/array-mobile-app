
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Text,
  Content,
} from 'native-base';


class Settings extends Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Content>
        <Text>settings</Text>
      </Content>
    );
  }
}

export default connect()(Settings);
