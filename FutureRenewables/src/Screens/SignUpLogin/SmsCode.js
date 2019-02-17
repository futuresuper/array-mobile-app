
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
  Input,
  Item,
} from 'native-base';

import {
  Config,
} from 'src/Common/config';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

class SmsCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smsCode: '',
    };
  }

  async handlePress() {
    const { navigation } = this.props;
    const { Api, toast } = this.props.screenProps;
    const { smsCode } = this.state;

    if (!smsCode) {
      toast('Specify SMS code');
      return false;
    }

    const mobile = navigation.getParam('mobile', 'none supplied');
    const dummySmsCode = Config.get().smsCode;

    if (dummySmsCode && (smsCode === dummySmsCode)) {
      this.nextScreen();
      return true;
    }

    Api.post('user/login', {
      username: mobile,
      token: smsCode,
    })
      .then(() => {
        this.nextScreen();
      })
      .catch((err) => {
        toast(err.message);
      });

    return true;
  }

  nextScreen() {
    const { navigation } = this.props;
    const { navigateTo } = this.props.screenProps;
    const newRego = navigation.getParam('newRegistration', false);

    if (newRego) navigateTo('ApplicationType');
    else navigateTo('AccountsApplications');
  }

  render() {
    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
          <View>
            <Text style={styleGlobal.formHeading}>
              Enter your SMS code
            </Text>

            <Item regular error={false}>
              <Input
                returnKeyType="next"
                keyboardType="numeric"
                placeholder="XXXXXX"
                style={styleGlobal.textCenter}
                onChangeText={(smsCode) => { this.setState({ smsCode }); }}
              />
            </Item>

          </View>

          <KeyboardAvoidingView behavior="padding">
            <Button
              onPress={this.handlePress.bind(this)}
              block
            >
              <Text>Go</Text>
            </Button>
            <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
          </KeyboardAvoidingView>

      </Content>
    );
  }
}

export default connect()(SmsCode);
