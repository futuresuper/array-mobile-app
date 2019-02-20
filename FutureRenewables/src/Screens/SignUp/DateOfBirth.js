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

class DateOfBirth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      submitted: false,
      errors: '',
    };
  }

  handlePress() {
    const { navigateTo } = this.props.screenProps;
    navigateTo('HomeAddress');
  }

  render() {
    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Date of Birth
          </Text>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="DD/MM/YYYY"
              textCenter
              autoCorrect={false}
              onChangeText={(value) => { this.setState({ value }); }}
            />
          </Item>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
          >
            <Text>Next</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
};


export default connect()(DateOfBirth);
