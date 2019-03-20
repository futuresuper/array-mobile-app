
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Text,
  Content,
} from 'native-base';

class TabHome extends Component {
  render() {
    return (
      <Content>
        <Text>Main tab</Text>
      </Content>
    );
  }
}

export default connect()(TabHome);
