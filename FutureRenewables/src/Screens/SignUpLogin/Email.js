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
import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';

import {
  styleGlobal,
} from 'src/Styles';

class Email extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        emailAddress: {
          validations: [
            'required',
            'email',
          ],
        },
      },
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      const email = hocs.form.emailAddress.value;

      screenProps.Api.post('/user', {
        email,
      }, () => {
        screenProps.navigateTo(routeNames.DATE_OF_BIRTH);
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
            <Text style={styleGlobal.formHeading}>
              Your Email Address
            </Text>

            <Input
              formData={form}
              formKey="emailAddress"
              helper="Email Address"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={hocs.handleInput}
            />
          </View>

          <KeyboardAvoidingView>
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


const res = composeHoc([
  'FormHoc',
])(Email);

export default connect()(res);
