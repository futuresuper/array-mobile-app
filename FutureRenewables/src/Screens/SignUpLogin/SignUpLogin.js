
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
  Col,
  Row,
} from 'native-base';

// import styles from './styles';
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

  formatAndValidateMobile(strPre) {
    const str = strPre.replace(/[^0-9]+/g, '');
    if (str[0] === '6' && str.length === 11) {
      this.setState({ errors: '' });
      return str;
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

  async getSms() {
    console.log('!!!');
    return false;
    const formattedMobile = this.formatAndValidateMobile(this.state.mobile);
      const url = "https://api.staging.futurerenewablesfund.com.au/api/v1/send/sms?mobile=" + formattedMobile;
      try {
         let response = await fetch(url,
            {
               method: "POST",
               headers: {
                 "Accept": "application/json",
                 "Content-Type": "application/json"
                }
            }
          );
          if (response.status >= 200 && response.status < 300) {
              console.log("SMS sent");
              console.log(response);
              this.props.navigation.navigate('SmsCode', {mobile: this.state.mobile} );
          } else {
            console.log("There was a problem:");
            console.log(response);
          }
      } catch (errors) {
           console.log("errors: " + errors);
      }
  }

  handleChange(mobile) {
    if (this.state.submitted) {
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

            <Item regular error={ inpErr }>
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
              onPress={this.getSms.bind(this)}
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
