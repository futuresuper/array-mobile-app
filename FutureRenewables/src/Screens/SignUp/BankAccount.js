
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
      screenProps.navigateTo('DirectDebitAuth');
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Bank Account
          </Text>

          <Text style={[styleGlobal.textCenter, styleGlobal.colorGray, styleGlobal.mB20]}>
            Choose the bank account you’d like us to automatically direct debit to fund your investment.
          </Text>

          <Text style={[styleGlobal.textCenter, styleGlobal.colorGray, styleGlobal.mB20]}>
            We’ll also pay any withdrawals to this account.
          </Text>

          <Input
            formData={form}
            formKey="accountName"
            placeholder="Account Name"
            onChangeText={hocs.handleInput}
            itemProps={{
              marginBottom: true,
            }}
          />

          <Input
            formData={form}
            formKey="bsb"
            placeholder="BSB"
            onChangeText={hocs.handleInput}
            itemProps={{
              marginBottom: true,
            }}
          />

          <Input
            formData={form}
            formKey="accountNumber"
            placeholder="Account Number"
            onChangeText={hocs.handleInput}
            itemProps={{
              marginBottom: true,
            }}
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
])(BankAccount);

export default connect()(res);
