import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Content, Button, Text, } from 'native-base';
import { routeNames } from 'src/Navigation';
import { composeHoc, hocNames } from 'src/Common/Hocs';
import signUpLoginUtils from 'src/Common/signUpLogin';
import { Input } from 'src/Components/Form';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
import { userDataSave } from 'src/Redux/Auth';
import { appContentSave } from 'src/Redux/AppContent';
import { styleGlobal } from 'src/Styles';
import amplitude from 'amplitude-js';

class Email extends React.Component {
    state = {
      form: {
        emailAddress: {
          validations: [
            'required',
            'email',
          ],
        },
      },
    };

    componentDidMount() {
      const { hocs, screenProps } = this.props;
      const { form } = this.state;

      hocs.setForm(form).then(() => {
        const userDetails = screenProps.getUserInfo();
        hocs.handleInput(userDetails.email || '', 'emailAddress');
      });
    }

    handlePress() {
        const { screenProps, hocs, userDataSaveConnect, appContentSaveConnect } = this.props;
        const formIsValid = hocs.formIsValid();
        if (formIsValid) {
            const email = hocs.form.emailAddress.value;
            screenProps.Api.post('/user', {
              email,
            }, () => {
              this.getAppContent((appContent) => {
                  const { user } = appContent;
                  userDataSaveConnect(user);
                  appContentSaveConnect(appContent);
                  if (user.experiments.EXPERIMENT_REVERSE_ONBOARDING && user.experiments.EXPERIMENT_REVERSE_ONBOARDING === "A_REVERSE_ONBOARDED") {
                      this.setAmplitudeTestGroup("A_REVERSE_ONBOARDED")
                      screenProps.navigateTo(routeNames.TAB_HOME);
                  } else {
                      if (user.experiments.EXPERIMENT_REVERSE_ONBOARDING && user.experiments.EXPERIMENT_REVERSE_ONBOARDING === "B_NORMAL_ONBOARDING") {
                          this.setAmplitudeTestGroup("B_NORMAL_ONBOARDING")
                      }
                      screenProps.navigateTo(routeNames.DATE_OF_BIRTH);
                  }
              });
            }, () => {
              screenProps.toastDanger('Error. Try again.');
            });
        }
    }

    setAmplitudeTestGroup(group) {
      let identify = new amplitude.Identify().set('EXPERIMENT_REVERSE_ONBOARDING', group);
      amplitude.getInstance().identify(identify);
    }

    getAppContent(callback) {
      const { screenProps } = this.props;
      screenProps.Api.get('/appcontent', {}, callback, () => {
        screenProps.toast('Something went wrong. Please try refreshing your app, or contact us: hello@arrayapp.co');
      });
    }

    render() {
      const { hocs } = this.props;
      const { form } = hocs;

      return (
        <Content padder contentContainerStyle={styleGlobal.flexGrow}>
          <View style={styleGlobal.spaceBetween}>
            <View>
              <Text style={[styleGlobal.formHeading, styleGlobal.mB50]}>
              Your email
              </Text>

              <Input
                formData={form}
                formKey="emailAddress"
                helper="Email address"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={hocs.handleInput}
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


const mapStateToProps = (state, ownProps) => {
  const { accountType, isFeat } = signUpLoginUtils.getAccountType(ownProps.navigation);

  return {
    accountType,
    isFeat,
  };
};

const mapDispatchToProps = {
  userDataSaveConnect: userDataSave,
  appContentSaveConnect: appContentSave
}

const res = composeHoc([
  hocNames.FORM,
])(Email);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(res);
