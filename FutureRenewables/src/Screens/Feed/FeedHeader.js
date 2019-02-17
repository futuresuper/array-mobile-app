import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default class FeedHeader extends React.Component {
  render() {
    const { itemContents } = this.props;
    return (
      <View style={styles.header}>
        <Video
          source={require('src/assets/video/solarFlyover.mp4')}
          ref={ref => this.player = ref}
          resizeMode="cover"
          repeat
          style={styles.backgroundVideo}
        />
        <Text style={styles.balance}>$84,536.20</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  balance: {
    fontFamily: 'Lato',
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
  },
  header: {
    width: '100%',
    height: 200,
    backgroundColor: '#fccd3b',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
