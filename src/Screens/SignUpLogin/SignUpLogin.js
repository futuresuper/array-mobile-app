
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Platform,
} from 'react-native';

import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  Input,
} from 'src/Components/Form';

import SafeAreaView from 'src/Components/SafeAreaView';
import generalUtils from 'src/Common/general';
import { Config } from 'src/Common/config';

import {
  styleGlobal, sg,
} from 'src/Styles';

import {
  routeNames,
} from 'src/Navigation';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
// import ListLinks from 'src/Components/ListLinks';

class SignUpLogin extends Component {
    static navigationOptions = () => ({
      headerTitle: (
        <View style={{
          flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginLeft: Platform.OS === 'ios' ? 0 : -42,
        }}
        >
          {/*
          <Text style={[sg.fS10, sg.mB5, sg.mT5]}>

              Step 1 of 4

          </Text>
          */}
          <Text style={[sg.fS22, sg.textBold]}>
            Mobile Number
          </Text>
        </View>
      ),
      headerLeftContainerStyle: {
        paddingTop: 9,
      },
    })

    state = {
      mobile: '',
      errors: '',
      submitted: false,
      isInputDisabled: false,
    };

    componentDidMount() {
      const { screenProps: { isTestMode } } = this.props;
      const { testUser } = Config.get();

      const setTestMobile = !!(isTestMode() && testUser);
      if (setTestMobile) {
        this.setState({
          mobile: testUser.phoneNumber,
          isInputDisabled: true,
        });
      }
    }

    getSms() {
      const { screenProps } = this.props;
      const { Api, toast, navigateTo } = screenProps;
      const { mobile } = this.state;
      let formattedMobile = this.formatAndValidateMobile(mobile);

      if (!formattedMobile) return false;

      formattedMobile = `+${formattedMobile}`;
      Api.signIn(formattedMobile).then(() => {
        navigateTo(routeNames.SMS_CODE, { mobile: formattedMobile });
      }).catch((err) => {
        screenProps.spinnerHide();
        toast(err.message || 'Unknown error');
      });

      return true;
    }

    formatAndValidateMobile(strPre) {
      const { screenProps: { isTestMode } } = this.props;
      const str = strPre.replace(/[^0-9]+/g, '');

      // no validation if it's a test number
      if (isTestMode() && generalUtils.isTestNumber(str)) {
        return `${str}`;
      }

      if (
        (str[0] === '7' && str.length === 10)
      || (str[0] === '6' && str.length === 10)
      || (str[0] === '5' && str.length === 10)
      || (str[0] === '4' && str.length === 10)
      || (str[0] === '3' && str.length === 10)
      || (str[0] === '2' && str.length === 10)
      ) {
        this.setState({ errors: '' });
        return `1${str}`;
      } if (str[0] === '6' && str.length === 11) {
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

    handleChange(mobile) {
      const { submitted } = this.state;
      if (submitted) {
        this.formatAndValidateMobile(mobile);
      }

      this.setState({ mobile });
    }

    render() {
      const { screenProps } = this.props;
      const { errors, mobile, isInputDisabled } = this.state;
      const inputHelper = isInputDisabled ? 'Test mobile number' : 'Your mobile number';

      return (
        <SafeAreaView themeMode={screenProps.themeMode} forceInset={{ top: 'never' }}>

          <Content padder contentContainerStyle={[styleGlobal.flexGrow]}>
            <View style={styleGlobal.spaceBetween}>
              <View>
                <Input
                  helper={inputHelper}
                  autoFocus
                  returnKeyType="next"
                  keyboardType="numeric"
                  value={mobile}
                  onChangeText={(e) => { this.handleChange(e); }}
                  onSubmitEditing={() => this.getSms()}
                  disabled={isInputDisabled}
                  disabledBordered={isInputDisabled}
                />
                <Text style={styleGlobal.formError}>
                  {errors}
                </Text>
              </View>
              <KeyboardAvoidingView keyboardVerticalOffset={100}>
                <Button
                  onPress={() => this.getSms()}
                  block
                >
                  <Text>Next</Text>
                </Button>
              </KeyboardAvoidingView>

            </View>

            {/* <ListLinks
          absolute
          navigateTo={screenProps.navigateTo}
          data={[
            {
              name: 'SmsCode',
              screen: routeNames.SMS_CODE,
            },
          ]}
        /> */}

          </Content>
        </SafeAreaView>
      );
    }
}

export default connect()(SignUpLogin);
