import React from 'react';
import { Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import Button from '../ui/Button';
const styleSettings = require('../../styles/styleSettings.json');
import globalStyles from '../../styles/Style';
import flowNext from './flows/flowNavigation.js';


export default class ApplicationType extends React.Component {

    handlePress(applicationType) {
      const nextPage = flowNext("individual","ApplicationType");
      this.props.navigation.navigate(nextPage,{
        applicationType: applicationType,
        lastPage: "ApplicationType",
        currentPage: nextPage,
      });
    }

    render() {
      return (
        <View style={globalStyles.signUpFormContainer}>
          <View>
            <Text style={globalStyles.formHeading}>
              What sort of account would you like to set up?
            </Text>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <Button
              text="Individual"
              onPress={() => this.handlePress("individual")}
            />
            <Button
              text="Joint"
              onPress={() => this.handlePress("joint")}
              secondary
            />
            <Button
              text="Adult for child"
              onPress={() => this.handlePress("adultForChild")}
              secondary
            />
            <Button
              text="Company / Partnership"
              onPress={() => this.handlePress("companyPartnership")}
              secondary
            />
            <Button
              text="SMSF / Trust / Super Fund"
              onPress={() => this.handlePress("smsfTrustSuperFund")}
              secondary
            />
            <View style={{ height: styleSettings.keyboardAvoidingHeight }} />
          </KeyboardAvoidingView>
        </View>
      );
    }

};
