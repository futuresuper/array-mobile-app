import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from '../ui/Button';
const styleSettings = require('../../styles/styleSettings.json');
import globalStyles from '../../styles/Style';
import flowNext from './flows/flowNavigation.js';

export default class HomeAddress extends React.Component {

  handlePress() {
    this.goToNextPage();
  }

  render() {
    return (
      <View style={globalStyles.signUpFormContainer}>
        <View>
          <Text style={globalStyles.formHeading}>
            Home Address
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
