
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Text,
  Content,
} from 'native-base';

class TabActivity extends Component {
  render() {
    return (
      <Content>
        <Text>Activity tab</Text>
      </Content>
    );
  }
}

export default connect()(TabActivity);

