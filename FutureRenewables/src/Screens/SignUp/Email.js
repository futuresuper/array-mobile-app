import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Content,
  Button,
  Text,
} from 'native-base';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';

import {
  styleGlobal,
  styleConstants,
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
      screenProps.navigateTo('DateOfBirth');
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Your Email Address
          </Text>

          <Input
            formData={form}
            formKey="emailAddress"
            placeholder="Email Address"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={hocs.handleInput}
          />
        </View>

        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Next</Text>
          </Button>
          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}


const res = composeHoc([
  'FormHoc',
])(Email);

export default connect()(res);
