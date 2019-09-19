
import React, { Component } from 'react';
import { connect } from 'react-redux';
import amplitude from 'amplitude-js';


import {
  View,
} from 'react-native';

import PropTypes from 'prop-types';

import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  Input,
} from 'src/Components/Form';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
import {
  userDataSave,
} from 'src/Redux/Auth';
import {
  appContentSave,
} from 'src/Redux/AppContent';
import {
  Config,
} from 'src/Common/config';

import {
  routeNames,
} from 'src/Navigation';

import {
  styleGlobal,
} from 'src/Styles';

class SmsCode extends Component {
    state = {
      smsCode: '',
    };

    getAppContent(callback) {
      const { screenProps } = this.props;
      screenProps.Api.get('/appcontent', {},
        callback,
        () => {
          screenProps.toast('Unknown error (appcontent)');
        });
    }

    handlePress() {
      const {
        screenProps,
        userDataSaveConnect,
        appContentSaveConnect,
        mobile,
      } = this.props;
      const { Api, toast } = screenProps;
      const { smsCode } = this.state;


      if (!smsCode) {
        toast('Specify SMS code');
        return false;
      }

      const dummySmsCode = Config.get().smsCode;

      if (dummySmsCode && (smsCode === dummySmsCode)) {
        this.nextScreen();
        return true;
      }

      Api.answerCustomChallenge(smsCode).then((userData) => {
        if (userData) {
          Api.post('/user', {
            mobile,
            mobileVerified: true,
          }, () => {
            this.getAppContent((appContent) => {
              const { user } = appContent;
              userDataSaveConnect(user);
              appContentSaveConnect(appContent);
              // console.log("user: " + JSON.stringify(user));
              // console.log("appContent: " + JSON.stringify(appContent));
              this.nextScreen(appContent.accounts.length);
              amplitude.getInstance().logEvent('Entered SMS Code - Success', {});
            });
          }, () => {
            screenProps.toast('Unknown error');
            amplitude.getInstance().logEvent('Entered SMS Code - Failed', {});
          });
        } else {
          screenProps.toast('Please enter the correct code');
        }
      }).catch(() => {
        screenProps.toast('Code timed out - Please try again');
        amplitude.getInstance().logEvent('Entered SMS Code - TimedOut', {});
        screenProps.navigateTo(routeNames.SIGN_UP_LOGIN);
      });

      return true;
    }

    nextScreen(numAccounts) {
      const { screenProps } = this.props;
      const { navigateTo } = screenProps;
      if (numAccounts > 0) {
        navigateTo(routeNames.ACCOUNTS);
      } else {
        navigateTo(routeNames.ACCOUNT_TYPE);
      }
    }

    render() {
      let { mobile } = this.props;
      const { smsCode } = this.state;

      if (mobile) {
      // If it's an Australian number, change to pretty display format, otherwise leave as is
        if (mobile.substr(0, 3) === '+61') {
          mobile = mobile.substr(3);
          mobile = `0${mobile.substr(0, 3)} ${mobile.substr(3, 3)} ${mobile.substr(6, mobile.length)}`;
        }
      }

      return (
        <Content padder contentContainerStyle={styleGlobal.flexGrow}>
          <View style={styleGlobal.spaceBetween}>
            <View>
              <Text style={styleGlobal.formHeading}>
              Verify
              </Text>

              <Text style={styleGlobal.mB30}>
              We&apos;ve just texted you a code to
                {'\n'}
                <Text style={styleGlobal.textBold}>{mobile}</Text>
              &nbsp;to verify your number
              </Text>

              <Input
                helper="Code"
                returnKeyType="next"
                keyboardType="numeric"
                value={smsCode}
                onChangeText={(e) => { this.setState({ smsCode: e }); }}
              />

            </View>

            <KeyboardAvoidingView keyboardVerticalOffset={100}>
              <Button
                onPress={() => this.handlePress()}
                block
              >
                <Text>Next</Text>
              </Button>
            </KeyboardAvoidingView>
          </View>

        </Content>
      );
    }
}

SmsCode.propTypes = {
  userDataSaveConnect: PropTypes.func.isRequired,
  mobile: PropTypes.string.isRequired,
  appContentSaveConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const mobile = ownProps.navigation.getParam('mobile');

  return {
    mobile,
  };
};

const mapDispatchToProps = {
  userDataSaveConnect: userDataSave,
  appContentSaveConnect: appContentSave,
};

export default connect(mapStateToProps, mapDispatchToProps)(SmsCode);
