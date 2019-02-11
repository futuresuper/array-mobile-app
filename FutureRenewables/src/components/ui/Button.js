import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
const styleSettings = require('../../styles/styleSettings.json');

export default class Button extends React.Component {

  render() {
    const buttonColor = this.props.secondary ? styleSettings.color.secondary : styleSettings.color.primary;
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonBackground, { backgroundColor: buttonColor }]}
          onPress={() => this.props.onPress()}
        >
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
    width: "100%",
    flexDirection: "row",
  },
  buttonBackground: {
    borderRadius: styleSettings.radius,
    marginBottom: 16,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: styleSettings.font,
    fontSize: 20,
    color: "black",
    margin: 14,
  },
});
