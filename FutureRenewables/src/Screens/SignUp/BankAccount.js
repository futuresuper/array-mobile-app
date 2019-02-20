
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Content,
  Button,
  Item,
  Input,
  Text,
} from 'native-base';

import {
  styleGlobal,
  styleConstants,
} from 'src/Styles';

class BankAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        accountName: '',
        bsb: '',
        accountNumber: '',
      },
    };
  }

  handlePress() {
    const { navigateTo } = this.props.screenProps;
    navigateTo('DirectDebitAuth');
  }

  onChangeInput(e, inputKey) {
    this.setState({
      form: {
        ...this.state.form,
        [inputKey]: e,
      },
    });
  }

  render() {
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

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="Account Name"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e, 'accountName'); }}
              value={this.state.form.accountName}
            />
          </Item>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="BSB"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e, 'bsb'); }}
              value={this.state.form.bsb}
            />
          </Item>

          <Item regular error={false} marginBottom>
            <Input
              returnKeyType="next"
              placeholder="Account Number"
              textCenter
              autoCorrect={false}
              onChangeText={(e) => { this.onChangeInput(e, 'accountNumber'); }}
              value={this.state.form.accountNumber}
            />
          </Item>

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

export default connect()(BankAccount);
