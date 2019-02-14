

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
    const { Api, toast, navigateTo } = this.props.screenProps;
    const { smsCode } = this.state;

    if (!smsCode) {
      toast('Specify SMS code');
      return false;
    }

    const mobile = navigation.getParam('mobile', 'none supplied');
    const newRego = navigation.getParam('newRegistration', false);

    Api.post('user/login', {
      // username: '61402239471',
      username: mobile,
      token: smsCode,
    })
      .then((res) => {
			  console.log('!!!: SmsCode -> handlePress -> res', res);
        if (newRego) navigateTo('ApplicationType');
        else navigateTo('AccountsAndApplications');
      })
      .catch((err) => {
        toast(err.message);
      });

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
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
