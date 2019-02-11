import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from './ui/Button';
const styleSettings = require('../styles/styleSettings.json');
import globalStyles from '../styles/Style';

export default class SignUpOrLoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Sign Up or Login',
  }

  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      errors: '',
      submitted: false,
    };
  }

  formatAndValidateMobile(strPre) {
    str = strPre.replace(/[^0-9]+/g, '');
    if (str[0] === "6" && str.length == 11) {
      this.setState({ errors: "" })
      return str;
    }
    else if (str[0] === "0" && str[1] === "4" && str.length == 10) {
      this.setState({ errors: "" });
      const replacedZero = str.replace('0','61');
      return replacedZero;
    }
    else if (str[0] === "4" && str.length == 9) {
      this.setState({ errors: "" })
      return "61" + str;
    }
    else {
      console.log("Number: " + str + " is not valid")
      this.setState(
        {
          errors: "Please enter a valid Australian mobile number",
          submitted: true
        }
      )
    }
  }

  async getSms() {
    const formattedMobile = this.formatAndValidateMobile(this.state.mobile);
      const url = "https://api.staging.futurerenewablesfund.com.au/api/v1/send/sms?mobile=" + formattedMobile;
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

  handleChange(mobile) {
    if (this.state.submitted) {
      this.formatAndValidateMobile(mobile);
    };
    this.setState({mobile});
  }

  errorFieldFormat() {
    if (this.state.submitted) {
        if (this.state.errors) {
          return {borderColor: styleSettings.color.danger}
        }
        else {
          return {borderColor: styleSettings.color.success};
        };
    };
  }

  render() {
    return (
      <View style={globalStyles.signUpFormContainer}>
        <View>
          <Text style={globalStyles.formHeading}>
            Please enter your mobile number
          </Text>
          <TextInput
            placeholder="0407 123 456"
            style={[globalStyles.input, this.errorFieldFormat()]}
            returnKeyType="next"
            keyboardType="numeric"
            onChangeText={(mobile) => this.handleChange(mobile)}
            autoFocus
          />
          <Text style={globalStyles.formError}>
            {this.state.errors}
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            text="Get SMS"
            onPress={this.getSms.bind(this)}
          />
          <View style={{ height: styleSettings.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </View>
    );
  };

};
