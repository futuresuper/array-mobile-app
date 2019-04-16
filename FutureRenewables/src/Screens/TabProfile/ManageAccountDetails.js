
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  FlatList,
} from 'react-native';

import {
  Button,
  Content,
  Text,
  Icon,
  H2,
  Left,
  Right,
  Thumbnail,
  Grid,
  Col,
  List,
  ListItem,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import {
  routeNames,
} from 'src/Navigation';

import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class ManageAccountDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Content padder>
        <Text>Account details/incomplete/edit</Text>
      </Content>
    );
  }
}

export default connect()(ManageAccountDetails);


