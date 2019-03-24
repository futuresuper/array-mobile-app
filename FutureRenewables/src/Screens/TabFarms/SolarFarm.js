
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  FlatList,
  Image,
} from 'react-native';

import {
  Content,
  Text,
  Button,
  Icon,
  H1,
  H3,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Header,
} from 'native-base';

import {
  sg,
  sc,
} from 'src/Styles';

import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class SolarFarm extends Component {

  render() {
    return (
        <Header>
          <Body>
          <Text>solarform</Text>
          </Body>
        </Header>
    );
  }
}

export default connect()(SolarFarm);
