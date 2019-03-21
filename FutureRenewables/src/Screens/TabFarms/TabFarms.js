
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Button,
  Text,
  Content,
  Icon,
  Grid,
  Row,
  Col,
  H1,
  Badge,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import {
  styleGlobal,
} from 'src/Styles';

// eslint-disable-next-line react/prefer-stateless-function
class TabFarms extends Component {
  render() {
    return (
      <Content>
        <Text>farm</Text>
      </Content>
    );
  }
}

export default connect()(TabFarms);
