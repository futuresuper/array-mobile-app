
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Text,
  Content,
} from 'native-base';

// eslint-disable-next-line react/prefer-stateless-function
class TabHome extends Component {
  render() {
    return (
      <Content>
        <Text>Home tab</Text>
      </Content>
    );
  }
}

export default connect()(TabHome);