
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  Config,
} from 'src/Common/config';

import ListLinks from 'src/Components/ListLinks';

import {
  styleGlobal,
} from 'src/Styles';

class SmsCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smsCode: '',
    };
  }

  handlePress() {
    const {
      screenProps,
      userDataSaveConnect,
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
          // userDataSaveConnect(userData);
          this.nextScreen();
        }, () => {
          screenProps.toast('Unknown error');
        });
      } else {
        screenProps.toast('Please enter the correct code');
      }
    }).catch(() => {
      screenProps.toast('Unknown error.');
    });

    return true;
  }

  nextScreen() {
    const { navigation, screenProps } = this.props;
    const { navigateTo } = screenProps;
    const newRego = navigation.getParam('newRegistration', false);

    if (newRego) navigateTo('ApplicationType');
    else navigateTo('Accounts');
  }

  render() {
    let { mobile } = this.props;
    const { screenProps } = this.props;
    const { navigateTo } = screenProps;
    const { smsCode } = this.state;

    if (mobile) {
      mobile = mobile.substr(-3);
    }

    return (
      <Content padder contentContainerStyle={styleGlobal.flexGrow}>
        <View style={styleGlobal.spaceBetween}>
          <View>
            <Text style={styleGlobal.formHeading}>
              Verify
            </Text>

            <Text>
              We&apos;ve just texted you a code to
              <Text style={styleGlobal.textBold}>
                &nbsp;xxx xxx&nbsp;
                {mobile}
              </Text>
              &nbsp;
              to verify your number
            </Text>

            <Input
              helper="Code"
              returnKeyType="next"
              keyboardType="numeric"
              value={smsCode}
              onChangeText={(e) => { this.setState({ smsCode: e }); }}
            />

          </View>

          <KeyboardAvoidingView>
            <Button
              onPress={() => this.handlePress()}
              block
            >
              <Text>Go</Text>
            </Button>
          </KeyboardAvoidingView>
        </View>

        <ListLinks
          absolute
          navigateTo={navigateTo}
          data={[
            {
              name: 'ApplicationType',
              screen: 'ApplicationType',
            },
            {
              name: 'Accounts',
              screen: 'Accounts',
            },
          ]}
        />
      </Content>
    );
  }
}

SmsCode.propTypes = {
  userDataSaveConnect: PropTypes.func.isRequired,
  mobile: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const mobile = ownProps.navigation.getParam('mobile');

  return {
    mobile,
  };
};

const mapDispatchToProps = {
  userDataSaveConnect: userDataSave,
};

export default connect(mapStateToProps, mapDispatchToProps)(SmsCode);
