import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from './ui/Button';

export default class SmsVerifyScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        smsCode: ''
      };
    }

    async handlePress() {
        const { navigation } = this.props;
        const mobile = navigation.getParam('mobile', 'none supplied');
        const newRego = navigation.getParam('newRegistration', false);
        console.log("mobile: " + mobile);
        console.log("new rego: " + newRego);
        const url = "https://api.staging.futurerenewablesfund.com.au/api/v1/user/login?username=61402239471&token=" + this.state.smsCode;
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
                console.log("Response code: " + response.status);
                console.log(response);
                newRego ? this.props.navigation.navigate('ApplicationType') : this.props.navigation.navigate('AccountsAndApplications');
            } else {
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
              Enter your SMS code
            </Text>
            <TextInput
              placeholder="XXXXXX"
              style={styles.input}
              returnKeyType="next"
              keyboardType="numeric"
              onChangeText={(smsCode) => this.setState({smsCode})}
              autoFocus
            />
          </View>
          <KeyboardAvoidingView behavior="padding">
            <Button
              text="Go"
              onPress={this.handlePress.bind(this)}
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
