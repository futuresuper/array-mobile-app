
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  Text,
  Item,
  Icon,
  Button,
} from 'native-base';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';


import composeHoc from 'src/Common/Hocs';
import {
  Input,
  Picker,
} from 'src/Components/Form';
import {
  routeNames,
} from 'src/Navigation';

import {
  formatAmountDollar,
  normalizeAmount,
} from 'src/Common/Helpers';

import {
  sg,
} from 'src/Styles';

import styles from './styles';



class Deposit extends Component {
  constructor() {
    super();

    this.state = {
      form: {
        amount: {
          validations: [
            'required',
          ],
          normalize: normalizeAmount,
          format: formatAmountDollar,
        },
      },
      step: 0,
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  onNext = () => {
    const { hocs, screenProps } = this.props;
    const formIsValid = hocs.formIsValid();
    const amount = hocs.form.amount.value;
    if (!this.withinMinMax(amount)) {
      screenProps.toastDanger('Minimum investment amount is $5');
      return;
    }
    if (formIsValid) {
      // screenProps.navigateTo(routeNames.DEPOSIT_WITHDRAW_DONE);
      this.setState({ step: 1 });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  withinMinMax(value) {
    if (value < 5 || value > 1000000) {
      return false;
    }
    return true;
  }

  onConfirm() {
    const { screenProps, hocs } = this.props;
    const { form } = hocs;
    const { account } = screenProps;
    const body = {
      amount: form.amount.value,
      paymentMethod: form.amount.value > 5000 ? 'eft' : 'dd',
      accountId: account.id
    };
    screenProps.Api.post('/transaction', body, () => {
      this.setState({ step: 2 });
    }, () => {
      screenProps.toastDanger('Error. Try Again');
    });
  }

  renderAccountSource() {
    const { hocs, screenProps } = this.props;
    const { form } = hocs;

    if (form && form.amount.value > 5000) {
      return (
        <Text style={[sg.pV20]}>
          {'Investments over $5,000 can be made by EFT.\n\nWe’ll provide you with the bank details for the transfer by email after you confirm.'}
        </Text>
      );
    } else {
      return (
        <Text style={[sg.pV20]}>
          {'To be direct debited from your linked bank account.'}
        </Text>
      );
    }

  }


  renderStep1 = () => {
    const { hocs } = this.props;
    const { form } = hocs;
    return (
      <View style={[sg.spaceBetween]}>
        <View>
          <Text style={[sg.formHeading]}>
          Make a deposit
          </Text>
          <View>
            <Input
              formData={form}
              formKey="amount"
              onChangeText={hocs.handleInput}
              keyboardType="numeric"
              label="Amount"
              color2
            />
          </View>
          {this.renderAccountSource()}
        </View>
        <KeyboardAvoidingView>
          <Button onPress={() => this.onNext()} block>
            <Text>Next</Text>
          </Button>
        </KeyboardAvoidingView>
      </View>
    );
  }

  renderStep2 = () => {
    const { hocs } = this.props;
    const { form } = hocs;
    const { amount, from } = form;
    return (
      <View style={[sg.spaceBetween]}>
        <View style={sg.zIndex10}>
          <View style={[styles.doneTextBl]}>
            <Text style={styles.doneText} color2>
              {"Confirming you'd like to invest "}
              <Text style={styles.doneTextBold}>
                {`${formatAmountDollar(amount.value)}`}
              </Text>
              {amount.value < 5000 ? (
                <Text>
                  <Text style={styles.doneText}>
                    {' from your linked bank account '}
                  </Text>
                </Text>
              ) : (
                <Text>
                  <Text style={styles.doneText}>
                    {' which you will transfer via EFT '}
                  </Text>
                </Text>
              )}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[sg.mB30, sg.fS11]}>
            {'Additional investments are made on the basis of the PDS and any updates to the PDS, on the same terms and conditions as in your original Application Form. We’ll send you notification of any updates when they happen.'}
          </Text>
          <KeyboardAvoidingView>
            <Button block onPress={() => this.onConfirm()}>
              <Text>Confirm</Text>
            </Button>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }

  render() {
    const { step } = this.state;

    return (
      <View style={[sg.spaceBetween, sg.spaceBetween]}>
        {step === 0 && this.renderStep1()}
        {step === 1 && this.renderStep2()}
      </View>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(Deposit);

export default res;
