import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from '../ui/Button';
const styleSettings = require('../../styles/styleSettings.json');
import globalStyles from '../../styles/Style';
import flowNext from './flows/flowNavigation.js';

export default class Name extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      submitted: false,
      errors: '',
    };
  }

  handlePress() {
    // TO DO - Make Error handling work
    this.state.errors ? this.setState({submitted: true}) : console.log("No errors");
    console.log("Ready to send to Save User API");
    console.log("First Name: " + this.state.firstName);
    console.log("Last Name: " + this.state.lastName);
    this.props.navigation.navigate('HomeAddress');

    /*
    const url = "https://api.staging.futurerenewablesfund.com.au/api/v1/users/?"
      + "first_name=" + this.state.firstName;
      + "&last_name=" + this.state.lastName;
    fetch(url, {
        method: 'PUT',
        headers: {
        "Accept": "application/json",
        'Content-Type': "application/json",
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUyYmM2YWM0YzZiMDU1MjQ4Y2YwNWU2YzU5YjNmMjkzNzdjYTYxMGI2MzI1NGE3ZWQxMzI0Y2JiZTNjMTczYjgzYjFkZWM4ODljMTkxOTY0In0.eyJhdWQiOiI3IiwianRpIjoiZTJiYzZhYzRjNmIwNTUyNDhjZjA1ZTZjNTliM2YyOTM3N2NhNjEwYjYzMjU0YTdlZDEzMjRjYmJlM2MxNzNiODNiMWRlYzg4OWMxOTE5NjQiLCJpYXQiOjE1NDgyMjAzMjYsIm5iZiI6MTU0ODIyMDMyNiwiZXhwIjoxNTUwODEyMzI2LCJzdWIiOiI2NDciLCJzY29wZXMiOltdfQ.b753JCMqgurE7CKvulcwYQDgEMjq6C2F3hMs3Gc6-ommkk2xEvACwkcxegkQlm_n-U29S3UcoFEG3rWQDyGg4vMajk4KJmbP79qs2HgOJ7EH0V-EfeczvzR1mGpO6Cldz619ifUrBye2rC0nQdrIFYOTRzBDGdQdfesBDvvsaZ2VXDXgUeC5eGUO4Lq25i-sPDJQ4Snq_yJt1ZvRC8CdG7TXnP11EhKHBooe7lVSYbl_q_7rYZ_judTnxNGNrHLmCn0yA6Q9eAd-6YLdZ0i1W6GilUEdAsHiG6C1uSgvFmJTzMuyEh2QqJxSQ_nevYai0-T9CNbm2rYhPaRErR0GfIYp0XM_D5T2qkdjn-Bw6M_zP0OdNTtOv0YceGmhf0NN2VkIKDNGo78wzNEwztCSJYiqbgmIB0XL8zPT7gpuRYAnSG_f2gt2Lhsx9MGEfyLlAHUyyoTRv97Ye6PnKYu5HHDxkIzyQXAT6qgtOIAx8CQ1cKh5yHb_WF7BcTOPH36M0t7rRd5pFVEPuyNu7wcBD9g9CtRpTvjrGdRDmabvN7oBEcKn6_TdBefHwBQ5AkrJqp-XjShcIy-JkNvH38T9_e1nZzBE8cPOgcabcMsEeOk_nRZIiVlVW8m1CbXg0FQFBm1wMVtWnZ8xncIg3eHFFxTRCYor0FIkltynrYkvR4A",
        }
    })
    .then(response => {
      console.log("response: " + JSON.stringify(response));
      return response.json();
    })
    .then(userData => {
      // this.setState({ "userData" : userData.data });
    })
    .catch(err => {
      console.log("Error: " + err);
    });
    this.goToNextPage();
    */
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
            Your name
          </Text>
          <TextInput
            placeholder="First Name"
            style={[globalStyles.input, this.errorFieldFormat()]}
            returnKeyType="next"
            onChangeText={(firstName) => this.setState({firstName})}
            autoCorrect={false}
            autoFocus
          />
          <TextInput
            placeholder="Last Name"
            style={[globalStyles.input, this.errorFieldFormat()]}
            returnKeyType="next"
            onChangeText={(lastName) => this.setState({lastName})}
            autoCorrect={false}
          />
          <Text style={globalStyles.formError}>
            {this.state.errors}
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            text="Next"
            onPress={() => this.handlePress()}
          />
          <View style={{ height: styleSettings.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </View>
    );
  }

  goToNextPage() {
    const applicationType = this.props.navigation.getParam("applicationType");
    const currentPage = this.props.navigation.getParam("currentPage");
    const lastPage = this.props.navigation.getParam("lastPage");
    const nextPage = flowNext(applicationType,currentPage);
    this.props.navigation.navigate(nextPage,{
      applicationType: applicationType,
      lastPage: currentPage,
      currentPage: nextPage,
    });
  }

};
