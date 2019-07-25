
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
  sg,
} from 'src/Styles';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';


import {
  routeNames,
} from 'src/Navigation';

class BankAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        accountName: {
          validations: ['required'],
        },
        bsb: {
          validations: ['required'],
        },
        accountNumber: {
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
      screenProps.navigateTo(routeNames.ID_CHECK_ONLINE);
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>
              Link bank account
            </Text>

            <Text style={sg.formHeadingDescription}>
              This will allow us to direct debit your investments
            </Text>

            <Input
              formData={form}
              formKey="accountName"
              helper="Bank account name"
              onChangeText={hocs.handleInput}
            />

            <Input
              formData={form}
              formKey="bsb"
              helper="BSB"
              onChangeText={hocs.handleInput}
            />

            <Input
              formData={form}
              formKey="accountNumber"
              helper="Account number"
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
])(BankAccount);

export default connect()(res);
