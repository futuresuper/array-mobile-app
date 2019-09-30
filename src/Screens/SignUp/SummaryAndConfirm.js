import React from 'react';
import {
  Image, View, Text, StyleSheet, TextInput, KeyboardAvoidingView,
} from 'react-native';
import Button from '../ui/Button';
import globalStyles from '../../styles/Style';

const styleSettings = require('../../styles/styleSettings.json');

export default class SummaryAndConfirm extends React.Component {
  handlePress() {
    this.props.navigation.navigate('Feed');
  }

  render() {
    return (
      <View style={globalStyles.signUpFormContainer}>
        <View>
          <Text style={globalStyles.formHeading}>
            Summary and Confirm
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
}
