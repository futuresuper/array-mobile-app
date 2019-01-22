import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default class Button extends React.Component {

  render() {
    const buttonColor = this.props.secondary ? '#CCCCCC' : '#FCCD3B';
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonBackground, { backgroundColor: buttonColor }]}
          onPress={() => this.props.onPress()}
        >
        {/*<TouchableOpacity style={styles.buttonBackground} onPress={() => this.props.navigation.navigate(this.props.targetPage)}>*/}
          <Text style={styles.buttonText}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  buttonBackground: {
    backgroundColor: '#FCCD3B',
    borderRadius: 8,
    marginBottom: 16,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Lato',
    fontSize: 20,
    color: 'black',
    margin: 14,
  },
});
