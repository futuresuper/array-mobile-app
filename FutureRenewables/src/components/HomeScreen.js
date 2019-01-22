import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import Button from '../ui/Button';
import Video from 'react-native-video';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <Video
          source={require('../images/solarTechnician.mp4')}
          ref={ref => this.player = ref}
          resizeMode="cover"
          repeat
          style={styles.backgroundVideo}
        />
        <View style={{ justifyContent: 'center', alignItems:'center' }}>
          <Text style={styles.h1}>Build your savings, while building solar farms</Text>
        </View>
        <View>
          <Button
            text="Next"
            onPress={() => this.props.navigation.navigate('SignUpOrLogin')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingBottom: 60,
  },
  h1: {
    fontFamily: 'Lato',
    fontSize: 28,
    color: "white",
    textAlign: 'center',
    margin: 28,
    fontWeight: '900',
  },
});
