import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
} from 'native-base';
import TextUnderline from 'src/Components/TextUnderline';


import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import { localAuthValidate } from 'src/Redux/Auth';


import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
import PinInput from 'src/Components/PinInput';

import {
  styleGlobal,
} from 'src/Styles';

class PinValidation extends React.Component {
    state = {
      form: {
        pin: {
          validations: ['pin'],
        },
      },
    };


    componentDidMount() {
      const { hocs } = this.props;
      const { form } = this.state;
      hocs.setForm(form);
    }

    logOut = () => {
      const { screenProps } = this.props;

      screenProps.disableTheme();
      screenProps.Api.logOut();
    };

    handleSubmit() {
      const {
        screenProps,
        localAuthValidateConnect,
        hocs,
        navigation,
      } = this.props;

      const formIsValid = hocs.formIsValid();

      if (formIsValid) {
        const pin = hocs.form.pin.value;
        screenProps.Api.post('/pin', { pin }, (res) => {
          if (res.matched) {
            localAuthValidateConnect();
            screenProps.navigateTo(navigation.getParam('next', 'TAB_HOME'));
          }
          if (res.tooManyAttempts) {
            screenProps.toastDanger('Too many incorrect attempts - please login with your phone instead');
          } else {
            screenProps.toastDanger('Error. Try again.');
          }
        }, () => {
          screenProps.toastDanger('Error. Try again.');
        });
      }
    }


    render() {
      const { hocs } = this.props;
      const { form } = hocs;

      return (
        <Content padder contentContainerStyle={styleGlobal.flexGrow}>
          <View style={styleGlobal.spaceBetween}>
            <View>
              <View>
                <Text style={[styleGlobal.formHeading, styleGlobal.mB10]}>
                  Enter your pin
                </Text>
              </View>
              <View style={[styleGlobal.center, styleGlobal.mT50]}>
                <PinInput
                  formData={form}
                  formKey="pin"
                  masked
                  helper="Enter Pin Code"
                  onChangeText={hocs.handleInput}
                />
              </View>
              <View style={[styleGlobal.center, styleGlobal.mT40]}>
                <TextUnderline style={[styleGlobal.textBold]} onPress={() => this.logOut()}>
                  Forgot your pin?
                </TextUnderline>
              </View>
            </View>

            <KeyboardAvoidingView keyboardVerticalOffset={100}>
              <Button
                onPress={() => this.handleSubmit()}
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


PinValidation.propTypes = {
  localAuthValidateConnect: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  localAuthValidateConnect: localAuthValidate,
};

const mapStateToProps = () => ({});

const res = composeHoc([
  hocNames.FORM,
])(PinValidation);

export default connect(mapStateToProps, mapDispatchToProps)(res);
