import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Content,
  Button,
  Text,
} from 'native-base';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

import flowNext from './flows/flowNavigation';

class HomeAddress extends React.Component {
  handlePress() {
    this.goToNextPage();
  }

  goToNextPage() {
    const applicationType = this.props.navigation.getParam('applicationType');
    const currentPage = this.props.navigation.getParam('currentPage');
    const nextPage = flowNext(applicationType, currentPage);
    this.props.navigation.navigate(nextPage, {
      applicationType,
      lastPage: currentPage,
      currentPage: nextPage,
    });
  }

  render() {
    return (
      <Content padder>
        <View>
          <Text style={styleGlobal.formHeading}>
            Your Home Address
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            text="Next"
            onPress={() => this.handlePress()}
          />
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

export default connect()(HomeAddress);
