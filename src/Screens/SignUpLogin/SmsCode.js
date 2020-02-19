
import React, { Component } from 'react';
import { connect } from 'react-redux';
import amplitude from 'amplitude-js';


import {
  View,
  Keyboard,
  Platform,
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
import generalUtils from 'src/Common/general';

import {
  routeNames,
} from 'src/Navigation';

import {
  styleGlobal, sg,
} from 'src/Styles';

import SafeAreaView from 'src/Components/SafeAreaView';


class SmsCode extends Component {
  static navigationOptions = () => ({
    headerTitle: (
      <View style={{
        flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginLeft: Platform.OS === 'ios' ? 0 : -42,
      }}
      >
        {/*
        <Text style={[sg.fS10, sg.mB5, sg.mT5]}>
          Step 2 of 4
        </Text>
        */}
        <Text style={[sg.fS22, sg.textBold]}>
          Verify
        </Text>
      </View>
    ),
    headerLeftContainerStyle: {
      paddingTop: 9,
    },
  })

    state = {
      smsCode: '',
      isInputDisabled: false,
    };

    componentDidMount() {
      const {
        mobile,
        screenProps: { isTestMode },
      } = this.props;

      // autologin if it's a test user
      const testUser = generalUtils.isTestNumber(mobile);
      if (isTestMode() && testUser) {
        this.setState({
          smsCode: testUser.password,
          isInputDisabled: true,
        });
      }
    }

    getAppContent(callback) {
      const { screenProps } = this.props;
      screenProps.Api.get('/appcontent', {},
        callback,
        () => {
          screenProps.spinnerHide();
          screenProps.toast('Unknown error (appcontent)');
        },
        false);
    }

    authProc(spinner = false) {
      const {
        screenProps,
        userDataSaveConnect,
        appContentSaveConnect,
        mobile,
      } = this.props;
      const { Api } = screenProps;

      if (spinner) {
        screenProps.spinnerShow();
      }

      Api.post('/user', {
        mobile,
        mobileVerified: true,
      }, () => {
        this.getAppContent((appContent) => {
          const { user } = appContent;
          userDataSaveConnect(user);
          appContentSaveConnect(appContent);
          const gotBasicDetails = (user.firstName !== undefined && user.lastName !== undefined && user.email !== undefined);

          this.nextScreen(gotBasicDetails);
          amplitude.getInstance().setUserId(user.id);
          amplitude.getInstance().logEvent('Entered SMS Code - Success', {});
        });
      }, () => {
        screenProps.spinnerHide();
        screenProps.toast('Unknown error');
        amplitude.getInstance().logEvent('Entered SMS Code - Failed', {});
      }, false);
    }

    handlePress() {
      const {
        screenProps,
        mobile,
      } = this.props;
      const { Api, toast } = screenProps;
      const { smsCode } = this.state;

      Keyboard.dismiss();

      if (generalUtils.isTestNumber(mobile)) {
        this.authProc(true);
        return true;
      }

      if (!smsCode) {
        toast('Specify SMS code');
        return false;
      }

      const dummySmsCode = Config.get().smsCode;

      if (dummySmsCode && (smsCode === dummySmsCode)) {
        this.nextScreen();
        return true;
      }

      screenProps.spinnerShow();
      Api.answerCustomChallenge(smsCode, false).then((userData) => {
        if (userData) {
          this.authProc();
        } else {
          screenProps.spinnerHide();
          screenProps.toast('Please enter the correct code');
        }
      }).catch(() => {
        screenProps.spinnerHide();
        screenProps.toast('Code timed out - Please try again');
        amplitude.getInstance().logEvent('Entered SMS Code - TimedOut', {});
        screenProps.navigateTo(routeNames.SIGN_UP_LOGIN);
      });

      return true;
    }

    nextScreen(gotBasicDetails) {
      const { screenProps } = this.props;
      const { navigateTo } = screenProps;

      if (gotBasicDetails) {
        navigateTo(routeNames.ACCOUNTS);
      } else {
        navigateTo(routeNames.NAME);
      }
    }

    render() {
      let { mobile } = this.props;
      const { screenProps } = this.props;
      const { smsCode, isInputDisabled } = this.state;

      if (mobile) {
      // If it's an Australian number, change to pretty display format, otherwise leave as is
        if (mobile.substr(0, 3) === '+61') {
          mobile = mobile.substr(3);
          mobile = `0${mobile.substr(0, 3)} ${mobile.substr(3, 3)} ${mobile.substr(6, mobile.length)}`;
        }
      }

      return (
        <SafeAreaView themeMode={screenProps.themeMode} forceInset={{ top: 'never' }}>
          <Content padder contentContainerStyle={styleGlobal.flexGrow}>
            <View style={styleGlobal.spaceBetween}>
              <View>
                <Text style={styleGlobal.mB30}>
                  We&apos;ve just texted you a code to
                  {'\n'}
                  <Text style={styleGlobal.textBold}>{mobile}</Text>
                    &nbsp;to verify your number
                </Text>

                <Input
                  helper="Code"
                  autoFocus
                  returnKeyType="next"
                  keyboardType="numeric"
                  value={smsCode}
                  onChangeText={(e) => { this.setState({ smsCode: e }); }}
                  onSubmitEditing={() => this.handlePress()}
                  disabled={isInputDisabled}
                  disabledBordered={isInputDisabled}
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
        </SafeAreaView>
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
