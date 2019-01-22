import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from '../ui/Button';

export default class SignUpOrLoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Sign Up or Login',
  }

  constructor(props) {
    super(props);
    this.state = {
      mobile: ''
    };
  }

  async getSms() {
      console.log("Getting SMS");
      const url = "https://api.staging.futurerenewablesfund.com.au/api/v1/send/sms?mobile=" + this.state.mobile;
      try {
         let response = await fetch(url,
            {
               method: "POST",
               headers: {
                 "Accept": "application/json",
                 "Content-Type": "application/json"
                }
            }
          );
          if (response.status >= 200 && response.status < 300) {
              console.log("SMS sent");
              console.log(response);
              this.props.navigation.navigate('SmsCode', {mobile: this.state.mobile} );
          } else {
            console.log("There was a problem:");
            console.log(response);
          }
      } catch (errors) {
           console.log("errors: " + errors);
      }
  }


  async handleGetSms() {
      console.log("button pressed");
      const url = "https://api.staging.futurerenewablesfund.com.au/api/v1/users?mobile=" + this.state.mobile;
      try {
         let response = await fetch(url,
            {
               method: "POST",
               headers: {
                 "Accept": "application/json",
                 "Content-Type": "application/json"
                }
            }
          );
          if (response.status >= 200 && response.status < 300) {
              console.log("New mobile number registered and SMS sent");
              console.log("Response code: " + response.status);
              console.log(response);
              this.props.navigation.navigate('SmsCode', {mobile: this.state.mobile, newRegistration:true} );
          } else if (response.status == 422) {
              console.log("Mobile already exists");
              console.log("Response code: " + response.status);
              console.log(response);
              this.getSms();
          } else {
              console.log("Something went wrong...");
              console.log("Response code: " + response.status);
              console.log(response);
          }
      } catch (errors) {
           console.log("errors: " + errors);
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.h2}>
            Please enter your mobile number
          </Text>
          <TextInput
            placeholder="0407 123 456"
            style={styles.input}
            returnKeyType="next"
            keyboardType="numeric"
            onChangeText={(mobile) => this.setState({mobile})}
            autoFocus
          />
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            text="Get SMS"
            onPress={this.handleGetSms.bind(this)}
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
    fontFamily: 'Lato',
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
    fontFamily: 'Lato',
    fontSize: 17,
    fontWeight: "900",
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
  },
});


/*
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../ui/Button';


export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign Up',
  }
  handleSubmit() {
      this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          text="Hello"
          onPress={this.handleSubmit.bind(this)}
        />
        <Button
          text="Hello"
          onPress={this.handleSubmit.bind(this)}
          secondary
        />
      </View>
    );
  }
}
*/
