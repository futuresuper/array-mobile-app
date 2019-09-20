import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
} from 'native-base';


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
      const { hocs } = this.props;
      const { form } = this.state;

      hocs.setForm(form);
    }

    handleSubmit() {
      const {
        screenProps,
        hocs,
      } = this.props;

      const formIsValid = hocs.formIsValid();
      if (formIsValid) {
        const pin = hocs.form.pin.value;

        screenProps.Api.post('/user', { pin }, () => {
          screenProps.navigateTo(routeNames.BIOMETRICS_SETUP);
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

const res = composeHoc([
  hocNames.FORM,
])(PinSetup);

export default connect()(res);
