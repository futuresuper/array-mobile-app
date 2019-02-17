import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

import flowNext from './flows/flowNavigation';

class ApplicationType extends Component {
  handlePress(applicationType) {
    const { navigateTo } = this.props.screenProps;
    const nextPage = flowNext('individual', 'ApplicationType');
    navigateTo(nextPage, {
      applicationType,
      lastPage: 'ApplicationType',
      currentPage: nextPage,
    });
  }

  render() {
    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
            What sort of account would you like to set up?
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress('individual')}
            block
            marginVertical
          >
            <Text>Individual</Text>
          </Button>
          <Button
            onPress={() => this.handlePress('joint')}
            block
            secondary
            marginVertical
          >
            <Text>Joint</Text>
          </Button>
          <Button
            onPress={() => this.handlePress('adultForChild')}
            block
            secondary
            marginVertical
          >
            <Text>Adult for child</Text>
          </Button>
          <Button
            onPress={() => this.handlePress('companyPartnership')}
            block
            secondary
            marginVertical
          >
            <Text>Company / Partnership</Text>
          </Button>
          <Button
            onPress={() => this.handlePress('smsfTrustSuperFund')}
            block
            secondary
            marginVertical
          >
            <Text>SMSF / Trust / Super Fund</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }

}

export default connect()(ApplicationType);
