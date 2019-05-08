
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Image,
  SafeAreaView,
} from 'react-native';

import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

import buildYourImpact from './images/buildYourImpact.png';

import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class BuildYourImpact extends Component {
  render() {
    return (
      <View style={sg.flex}>
        <Content>

          <Text style={{ marginTop: 80 }}>Build your impact</Text>
        </Content>

        <View style={styles.imageHeader}>
          <Image
            source={buildYourImpact}
          />
        </View>
      </View>
    );
  }
}

export default connect()(BuildYourImpact);
