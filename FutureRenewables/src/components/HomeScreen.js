import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import Button from '../ui/Button';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems:'center' }}>
          <Image
            style={{width: 200, height: 200, marginTop: 60}}
            source={require('../images/solarFarmCircle.png')}
          />
          <Text style={styles.h1}>Build your savings, while building solar farms</Text>
        </View>
        <View>
          <Button
            text="Sign Up"
            navigation={this.props.navigation}
            targetPage="SignUp"
          />
          <Button
            text="Login"
            navigation={this.props.navigation}
            targetPage="Login"
            secondary
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  h1: {
    fontSize: 28,
    textAlign: 'center',
    margin: 28,
    fontWeight: '900',
  },
});
