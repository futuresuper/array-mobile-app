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
  sg,
} from 'src/Styles';

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: {
          value: '',
          validations: [
            'required',
          ],
        },
        lastName: {
          value: '',
          validations: [
            'required',
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
      const firstName = hocs.form.firstName.value;
      const lastName = hocs.form.lastName.value;

      screenProps.Api.post('/user', {
        firstName,
        lastName,
      }, () => {
        screenProps.navigateTo(routeNames.EMAIL);
      }, () => {
        screenProps.toastDanger('Error. Try Again');
      });
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={[sg.formHeading]}>
              Your name
            </Text>

            <Text style={[sg.formHeadingDescription]}>
              Please enter your name as it appears on your drivers licence.
            </Text>

            <Input
              formData={form}
              formKey="firstName"
              helper="First name"
              onChangeText={hocs.handleInput}
              itemProps={{
                marginBottom: true,
              }}
            />

            <Input
              formData={form}
              formKey="lastName"
              helper="Last name"
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
])(Name);

export default connect()(res);
