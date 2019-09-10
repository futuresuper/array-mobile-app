
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
        from: {
          validations: [this.fromValidator.bind(this)],
        },
        /*
        frequency: {
          validations: [
            'required',
          ],
        },
        */
      },
      // frequencyList: [
      //   {
      //     name: 'Monthly',
      //     value: 'month',
      //   },
      //   {
      //     name: 'Annual',
      //     value: 'annual',
      //   },
      // ],
      step: 0,
      accountList: [
        {
          name: 'ING Account',
          number: 'BSB 92300 Acc 0981928',
        },
        {
          name: 'ING Account',
          number: 'BSB 92300 Acc 222',
        },
        {
          name: 'ING Account',
          number: 'BSB 92300 Acc 333',
        },
      ],
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


    if (formIsValid) {
      // screenProps.navigateTo(routeNames.DEPOSIT_WITHDRAW_DONE);
      this.setState({ step: 1 });
    }
  }


  onConfirm() {
    const { screenProps, hocs } = this.props;
    const { form } = hocs;
    const body = {
      amount: form.amount.value,
      paymentMethod: form.amount.value >= 5000 ? 'eft' : form.from.value,
    };
    screenProps.Api.post('/transaction', body, () => {
      this.setState({ step: 2 });
    }, () => {
      screenProps.toastDanger('Error. Try Again');
    });
  }

  fromValidator() {
    const { hocs } = this.props;
    const { form } = hocs;
    console.log(form.amount.value);
    if (form.amount.value >= 5000) {
      return false;
    }
    return true;
  }

  renderAccountSource() {
    const { hocs, screenProps } = this.props;
    const { form } = hocs;
    // console.log(form);
    let { accountList } = this.state;
    accountList = accountList.concat([{
      id: 'custom',
      name: 'Add account',
    }]);
    if (form && form.amount.value >= 5000) {
      return (
        <Text style={[sg.textBold, sg.pV20]}>
          {'Investments over $5,000 can only be made by EFT.\n\n We’ll provide you with the bank details for the transfer by email after you confirm.'}
        </Text>
      );
    }
    return (
      <Item style={[sg.noBorder]}>
        <Picker
          extraData={screenProps.theme}
          formData={form}
          formKey="from"
          label="From"
          title="My ING account"
          list={accountList}
          renderItem={({ item }) => {
            if (item.id === 'custom') {
              return (
                <View
                  style={[sg.row, sg.jCSpaceBetween]}
                  onPress={() => {
                  }}
                >
                  <Text style={sg.pickerItemAddText}>{item.name}</Text>
                  <Icon name="add" style={sg.pickerItemAddIcon} color0 />
                </View>
              );
            }

            return (
              <View>
                <Text style={sg.pickerItemText} color2>{item.name}</Text>
                <Text style={sg.pickerItemText2}>{item.number}</Text>
              </View>
            );
          }}
          onPressItem={({ item }, formKey) => {
            hocs.addOrUpdateFormField({ title: item.number, value: item.number }, formKey);
          }}
        />
      </Item>
    );
  }

  renderStep1 = () => {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <View style={[sg.spaceBetween]}>
        <View>
          <Input
            formData={form}
            formKey="amount"
            onChangeText={hocs.handleInput}
            keyboardType="numeric"
            label="Amount"
            color2
          />
          {this.renderAccountSource()}
        </View>
        <KeyboardAvoidingView>
          <Button style={[sg.m20]} onPress={() => this.onNext()} block>
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
                {`$${amount.value}`}
              </Text>
              {amount.value < 5000 ? (
                <Text>
                  <Text style={styles.doneText}>
                    {' from your '}
                  </Text>
                  <Text style={styles.doneTextBold}>
                    {`${form.from.value} account`}
                  </Text>
                </Text>
              ) : (
                <Text>
                  <Text style={styles.doneText}>
                    {' which you will '}
                  </Text>
                  <Text style={styles.doneTextBold}>
                    {'transfer via EFT'}
                  </Text>
                </Text>
              )}
            </Text>
          </View>
          <KeyboardAvoidingView>
            <Button block style={sg.m20} onPress={() => this.onConfirm()}>
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
