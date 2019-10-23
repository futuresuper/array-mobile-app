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

import { pinSave, localAuthSelector } from 'src/Redux/Auth';


import {
  routeNames,
} from 'src/Navigation';
import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
import PinInput from 'src/Components/PinInput';

import {
  styleGlobal,
} from 'src/Styles';

class PinSetup extends React.Component {
    state = {
      form: {
        pin: {
          validations: ['pin'],
        },
      },
    };


    componentDidMount() {
      const { hocs, localAuth } = this.props;
      const { form } = this.state;

      if (localAuth.pin) {
        // go to verification instead
      }

      hocs.setForm(form);
    }

    handleSubmit() {
      const {
        screenProps,
        hocs,
        pinSaveConnect,
        navigation,
      } = this.props;

      const next = navigation.getParam('next', '');
      const formIsValid = hocs.formIsValid();
      if (formIsValid) {
        const pin = hocs.form.pin.value;
        screenProps.Api.post('/user', { pin }, () => {
          pinSaveConnect(true);
          screenProps.navigateTo(routeNames.BIOMETRICS_SETUP, { next });
        }, () => {
          screenProps.tastDanger('Error. Try again.');
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
              Set up your security
                </Text>
                <Text>
                  Secure your account with a unique PIN.
                </Text>
              </View>
              <View style={[styleGlobal.center, styleGlobal.mT50]}>
                <PinInput
                  formData={form}
                  formKey="pin"
                  helper="Enter Pin Code"
                  onChangeText={hocs.handleInput}
                />
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

PinSetup.propTypes = {
  pinSaveConnect: PropTypes.func.isRequired,
  localAuth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const localAuth = localAuthSelector(state);
  return {
    localAuth,
  };
};

const mapDispatchToProps = {
  pinSaveConnect: pinSave,
};

const res = composeHoc([
  hocNames.FORM,
])(PinSetup);

export default connect(mapStateToProps, mapDispatchToProps)(res);
