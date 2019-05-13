
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
  tokenSave,
  userDataSave,
} from 'src/Redux/Auth';
import {
  Config,
} from 'src/Common/config';

import ListLinks from 'src/Components/ListLinks';

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

  handlePress() {
    const {
      navigation,
      screenProps,
      tokenSaveConnect,
      userDataSaveConnect,
    } = this.props;
    const { Api, toast } = screenProps;
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
    }, (res) => {
      tokenSaveConnect(res.data);
      Api.get('users/current', {}, (userData) => {
        userDataSaveConnect(userData);
        this.nextScreen();
      });
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
  tokenSaveConnect: PropTypes.func.isRequired,
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
  tokenSaveConnect: tokenSave,
  userDataSaveConnect: userDataSave,
};

export default connect(mapStateToProps, mapDispatchToProps)(SmsCode);
