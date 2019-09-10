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

class ApplicationType extends Component {
  handlePress(applicationType) {
    const { screenProps } = this.props;

    switch (applicationType) {
      case 'featArtist': {
        screenProps.navigateTo('FeatApplicationType');
        break;
      }
      case 'individual': {
        screenProps.navigateTo('Name');
        break;
      }
      case 'joint': {
        screenProps.navigateTo('JointNames');
        break;
      }
      case 'adultForChild': {
        screenProps.navigateTo('ChildsName');
        break;
      }
      case 'companyPartnership': {
        screenProps.navigateTo('EntityIsFinancialInstitution');
        break;
      }
      case 'smsfTrustSuperFund': {
        screenProps.navigateTo('PaperApp');
        break;
      }
      default: {
        break;
      }
    }
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
            onPress={() => this.handlePress('featArtist')}
            block
            dark
            marginVert
          >
            <Text style={styleGlobal.colorWhite}>FEAT Artist</Text>
          </Button>
          <Button
            onPress={() => this.handlePress('individual')}
            block
            marginVert
          >
            <Text>Individual</Text>
          </Button>
          <Button
            onPress={() => this.handlePress('joint')}
            block
            secondary
            marginVert
          >
            <Text>Joint</Text>
          </Button>
          <Button
            onPress={() => this.handlePress('adultForChild')}
            block
            secondary
            marginVert
          >
            <Text>Adult for child</Text>
          </Button>
          <Button
            onPress={() => this.handlePress('companyPartnership')}
            block
            secondary
            marginVert
          >
            <Text>Company / Partnership</Text>
          </Button>
          <Button
            onPress={() => this.handlePress('smsfTrustSuperFund')}
            block
            secondary
            marginVert
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
