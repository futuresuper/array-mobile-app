
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

class SignUpLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      errors: '',
      submitted: false,
    };
  }

  getSms() {
    const { screenProps } = this.props;
    const { Api, toast, navigateTo } = screenProps;
    const { mobile } = this.state;
    const formattedMobile = this.formatAndValidateMobile(mobile);

    if (!formattedMobile) return false;

    Api.post('send/sms', { mobile: formattedMobile })
      .then(() => {
        navigateTo('SmsCode', { mobile });
      })
      .catch((err) => {
        toast(err.message);
      });

    return true;
  }

  formatAndValidateMobile(strPre) {
    const str = strPre.replace(/[^0-9]+/g, '');
    if (str[0] === '6' && str.length === 10) {
      this.setState({ errors: '' });
      return `1${str}`;
    // eslint-disable-next-line no-else-return
    } else if (str[0] === '0' && str[1] === '4' && str.length === 10) {
      this.setState({ errors: '' });
      const replacedZero = str.replace('0', '61');
      return replacedZero;
    } else if (str[0] === '4' && str.length === 9) {
      this.setState({ errors: '' });
      return `61${str}`;
    } else {
      this.setState(
        {
          errors: 'Please enter a valid Australian mobile number',
          submitted: true,
        },
      );

      return '';
    }
  }

  handleChange(mobile) {
    const { submitted } = this.state;
    if (submitted) {
      this.formatAndValidateMobile(mobile);
    }

    this.setState({ mobile });
  }

  render() {
    const { errors, submitted } = this.state;
    const inpErr = (submitted && (errors !== ''));

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>

        <View>
          <Text style={styleGlobal.formHeading}>
            Please enter your mobile number
          </Text>

          <Item regular error={inpErr}>
            <Input
              returnKeyType="next"
              keyboardType="numeric"
              placeholder="0407 123 456"
              style={styleGlobal.textCenter}
              onChangeText={(mobile) => { this.handleChange(mobile); }}
            />
          </Item>

          <Text style={styleGlobal.formError}>
            {errors}
          </Text>
        </View>

        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.getSms()}
            block
          >
            <Text>Get SMS</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>

      </Content>
    );
  }
}

export default connect()(SignUpLogin);
