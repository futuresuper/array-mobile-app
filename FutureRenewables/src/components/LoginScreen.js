import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from '../ui/Button';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.h2}>
            Login with your mobile number
          </Text>
          <TextInput
            placeholder="0407 123 456"
            style={styles.input}
            returnKeyType="next"
            keyboardType="numeric"
            autoFocus
          />
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            text="Get SMS"
            navigation={this.props.navigation}
            targetPage="SmsCode"
            secondary
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

/*
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.description}>
            This demo2 shows how to avoid covering important UI elements with the software keyboard.
            Focus the email input below and notice that the Sign Up button and the text adjusted
            positions to make sure they are not hidden under the keyboard.
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <TextInput
            style={styles.input}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            ref={ref => {this._emailInput = ref}}
            placeholder="email@example.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="send"
            onSubmitEditing={this._submit}
            blurOnSubmit={true}
          />
          <View>
            <Button title="Sign Up" onPress={this._submit} />
            <Text style={styles.legal}>
              Some important legal fine print here
            </Text>
          </View>
          <View style={{height:1}} />
        </KeyboardAvoidingView>
      </View>
    );
  }

  _submit = () => {
    alert(`Confirmation email has been sent to ${this.state.email}`);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    paddingTop: 50,
    padding: 20,
    backgroundColor: '#336699',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  legal: {
    margin: 10,
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
*/
