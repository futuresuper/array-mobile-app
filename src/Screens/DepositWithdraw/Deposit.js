
import React, { Component } from 'react';
import {
  View,
  Clipboard,
} from 'react-native';
import {
  Text,
  Icon,
  Button,
  Grid,
  Col,
} from 'native-base';
import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';


import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';
import {
  routeNames,
} from 'src/Navigation';

import {
  formatAmountDollar,
  normalizeAmount,
} from 'src/Common/Helpers';

import { random } from 'lodash';

import {
  sg,
  sc,
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
      accountName: 'ONE REGISTRY SERVICES PTY LIMITED APPLICATIONS ACCOUNT 12',
      bsb: '332 027',
      accNo: '555 250 206',
      reference: '',
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;
    hocs.setForm(form);
    const { screenProps } = this.props;
    const { getUserInfo } = screenProps;
    const lname = getUserInfo().lastName;
    const accountRef = random(100, 999); // account.bankAccountNumber.slice(-3); when it becomes available from api
    const reference = `${lname}${accountRef}`;
    this.setState({ reference });
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


  onConfirm() {
    const { screenProps, hocs } = this.props;
    const { form } = hocs;
    const { account } = screenProps;
    const body = {
      amount: form.amount.value,
      paymentMethod: form.amount.value > 5000 ? 'eft' : 'dd',
      accountId: account.id,
    };
    screenProps.Api.post('/transaction', body, () => {
      if (body.amount > 5000) {
        this.setState({
          step: 2,
        });
      } else {
        if (account.amountAwaitingDirectDebit) {
          account.amountAwaitingDirectDebit = parseInt(account.amountAwaitingDirectDebit, 10) + parseInt(body.amount, 10);
        }
        screenProps.toast(`${formatAmountDollar(body.amount)} will be debited from your bank account in the next few days`, {
          iconType: 'MaterialCommunityIcons',
          iconName: 'check-circle',
        });
        screenProps.navigateTo(routeNames.TAB_HOME);
      }
    }, () => {
      screenProps.toastDanger('Error. Try Again');
    });
  }

  getAppContent(callback) {
    const { screenProps } = this.props;
    screenProps.Api.get('/appcontent', {}, callback, () => {
      screenProps.toast('Something went wrong. Please try refreshing your app, or contact us: hello@arrayapp.co');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  withinMinMax(value) {
    if (value < 5 || value > 1000000) {
      return false;
    }
    return true;
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
    const { amount } = form;
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

  handleMadeTransfer() {
    const { screenProps } = this.props;
    screenProps.toast('Thanks for confirming you made the transfer!', {
      iconType: 'MaterialCommunityIcons',
      iconName: 'check-circle',
    });
    screenProps.navigateTo(routeNames.TAB_HOME);
  }

  writeToClipboard = async (text, removeSpaces) => {
    const { screenProps } = this.props;
    text = removeSpaces ? text.replace(/\s+/g, '') : text;
    await Clipboard.setString(text);
    screenProps.toastSuccess('Copied to Clipboard!');
  };

  renderCopyContainer(key, value) {
    return (
      <Grid
        style={[sg.mT20, sg.bGWhite, sg.pV10, sg.pH10]}
        onPress={() => (key === "BSB" || key === "Acc No.") ? this.writeToClipboard(value,true) : this.writeToClipboard(value)}
      >
        <Col>
          <Text style={[sg.colorGray, sg.fS14, sg.mB10]}>{key}</Text>
          <Text style={[sg.textBold, sg.fS14]}>
            {value}
          </Text>
        </Col>
        <Col style={sg.width30}>
          <Icon style={{ color: sc.color.primary }} type="MaterialIcons" name="content-copy" />
        </Col>
      </Grid>
    );
  }

  renderAccountSource() {
    const { hocs } = this.props;
    const { form } = hocs;

    if (form && form.amount.value > 5000) {
      return (
        <Text style={[sg.pV20]}>
          {'Investments over $5,000 can be made by EFT.\n\nWe’ll provide you with the bank details for the transfer by email after you confirm.'}
        </Text>
      );
    }
    return (
      <Text style={[sg.pV20]}>
        {'To be direct debited from your linked bank account.'}
      </Text>
    );
  }

  renderEftDetails() {
    const {
      accountName, bsb, accNo, reference,
    } = this.state;
    const { hocs } = this.props;
    const { form } = hocs;
    const { amount } = form;
    return (
      <View>
        <View>
          <View style={[sg.left]}>
            <Text style={sg.formHeading}>
              {'Transfer Details'}
            </Text>
            <Text>
              {'To make your additional investment of '}
              { formatAmountDollar(amount.value) }
              {' you’ll need to make an EFT. Tap to copy the below details to make the transfer.'}
            </Text>
          </View>
          {this.renderCopyContainer('ACCOUNT NAME', accountName)}
          <Text style={[sg.pV10, sg.fS12, sg.pH10]}>
            {"It's not issue if the full name doesn't quiet fit"}
          </Text>
          {this.renderCopyContainer('BSB', bsb)}
          {this.renderCopyContainer('Acc No.', accNo)}
          {this.renderCopyContainer('Reference', reference)}
        </View>
        <View style={sg.mT20}>
          <Button onPress={() => this.handleMadeTransfer()} block marginVert>
            <Text>
              {"I've made the transfer"}
            </Text>
          </Button>
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
        {step === 2 && this.renderEftDetails()}
      </View>
    );
  }
}

/*
const mapDispatchToProps = {
  accountUpdateSaveConnect: accountUpdateSave,
};
*/

const res = composeHoc([
  'FormHoc',
])(Deposit);

export default res;
