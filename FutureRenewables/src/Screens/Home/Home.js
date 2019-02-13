
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Text,
  Button,
  Content,
  Icon,
} from 'native-base';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     header: null,
  //   };
  // }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Content padder bounces={false}>
        <Button onPress={() => { this.props.navigation.navigate('settings'); console.log('!!!!'); }}><Text>-</Text></Button>
      </Content>
    );
  }
}

export default connect()(Home);
