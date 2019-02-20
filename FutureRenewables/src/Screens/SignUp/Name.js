import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Content,
  Button,
  Item,
  Input,
  Text,
} from 'native-base';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

class Name extends React.Component {
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
    const { navigateTo } = this.props.screenProps;
    navigateTo('Email');
  }

  render() {
    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Your name
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="First Name"
              textCenter
              autoCorrect={false}
              onChangeText={(firstName) => { this.setState({ firstName }); }}
            />
          </Item>

          <Item regular error={false}>
            <Input
              returnKeyType="next"
              placeholder="Last Name"
              textCenter
             autoCorrect={false}
              onChangeText={(lastName) => { this.setState({ lastName }); }}
            />
          </Item>

          <Text style={styleGlobal.formError}>
            {this.state.errors}
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Next</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

export default connect()(Name);
