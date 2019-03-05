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
      screenProps.navigateTo('Email');

      // screenProps.Api.get('users/current', null,
      //   (res) => {
      //     console.log('!!!', { res });
      //   }, (err) => {
      //     console.log('!!!', { err });
      //   });

    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Your name
          </Text>

          <Input
            formData={form}
            formKey="firstName"
            placeholder="First Name"
            onChangeText={hocs.handleInput}
            itemProps={{
              marginBottom: true,
            }}
          />

          <Input
            formData={form}
            formKey="lastName"
            placeholder="Last Name"
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
])(Name);

export default connect()(res);
