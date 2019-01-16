import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from '../ui/Button';

export default class SmsVerifyScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.h2}>
            Enter your SMS code
          </Text>
          <TextInput
            placeholder="XXXXXX"
            style={styles.input}
            returnKeyType="next"
            keyboardType="numeric"
            autoFocus
          />
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            text="Go"
            navigation={this.props.navigation}
            targetPage="Feed"
          />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    backgroundColor: "white",
    color: "black",
    paddingHorizontal: 20,
    marginBottom: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#979797",
    borderRadius: 4,
  },
  h2: {
    fontSize: 17,
    fontWeight: "900",
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
  },
});
