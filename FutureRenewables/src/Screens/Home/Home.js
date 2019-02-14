
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Video from 'react-native-video';

import {
  View,
} from 'react-native';

import {
  Text,
  Button,
  H1,
} from 'native-base';

import videoFile from 'src/assets/video/solarTechnician.mp4';
import styles from './styles';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Video
          source={videoFile}
          ref={(ref) => {
            this.player = ref;
          }}
          resizeMode="cover"
          repeat
          style={styles.backgroundVideo}
        />

        <View style={styles.textBl}>
          <H1 style={styles.text}>Build your savings, while building solar farms</H1>
        </View>
        <Button
          onPress={() => this.props.screenProps.navigateTo('SignUpLogin')}
          block
        >
          <Text>Next</Text>
        </Button>
      </View>
    );
  }
}

export default connect()(Home);
