
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

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';

class ChildsName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        childFirstName: {
          validations: ['required'],
        },
        childLastName: {
          validations: ['required'],
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
      screenProps.navigateTo('AdultForChildAppType');
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
          Adult for Child application
          </Text>

          <Text style={[styleGlobal.textDescription, styleGlobal.mB20]}>
            Fore these applications, we&apos;ll note the child&apos;s name on most of the communications you receive,
            however the adult who signs up for the account is the account owner.
          </Text>

          <Input
            formData={form}
            formKey="childFirstName"
            placeholder="Child's First Name"
            onChangeText={hocs.handleInput}
            itemProps={{
              marginBottom: true,
            }}
          />

          <Input
            formData={form}
            formKey="childLastName"
            placeholder="Child's Last Name"
            onChangeText={hocs.handleInput}
            itemProps={{
              marginBottom: true,
            }}
          />

          <Text style={[styleGlobal.textDescription, styleGlobal.mT20]}>
            For the rest of this application, please enter your own details (not your child&apos;s)
          </Text>

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
])(ChildsName);

export default connect()(res);
