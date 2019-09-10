
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

class Deposit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        amount: {
          validations: [
            'required',
          ],
          normalize: normalizeAmount,
          format: formatAmountDollar,
        },
        /*
        from: {
          validations: [
            'required',
          ],
        },
        frequency: {
          validations: [
            'required',
          ],
        },
        */
      },
      frequencyList: [
        {
          name: 'Monthly',
          value: 'month',
        },
        {
          name: 'Annual',
          value: 'annual',
        },
      ],
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
      screenProps.navigateTo(routeNames.DEPOSIT_WITHDRAW_DONE);
    }
  }

  render() {
    const { hocs, screenProps } = this.props;
    const { form } = hocs;
    const { frequencyList } = this.state;
    let { accountList } = this.state;

    accountList = accountList.concat([{
      id: 'custom',
      name: 'Add account',
    }]);

    return (

      <View style={sg.spaceBetween}>
        {/* <Text>
          You'll be able to make a deposit here soon...
        </Text> */}
        <View>
          <Input
            formData={form}
            formKey="amount"
            onChangeText={hocs.handleInput}
            keyboardType="numeric"
          // style={[sg.fS24]}
            label="Amount"
            color2
          />


          <Item
            style={[sg.noBorder]}
          >
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

          {/* <Item
          style={[sg.noBorder]}
        >
        <Picker
            formData={form}
            formKey="frequency"
            label="Frequency"
            title="Frequence"
            list={frequencyList}
            renderItem={({ item }) => (
              <View>
              <Text style={sg.pickerItemText}>{item.name}</Text>
              </View>
            )}
            onInit={(formKey) => {
              const item = frequencyList[0];
              hocs.addOrUpdateFormField({ title: item.name, value: item.value }, formKey);
            }}
            onPressItem={({ item }, formKey) => {
              hocs.addOrUpdateFormField({ title: item.name, value: item.value }, formKey);
            }}
            />
          </Item> */}
        </View>
        <KeyboardAvoidingView>
          <Button
          // onPress={() => this.onNext()}
            block
          >
            <Text>Next</Text>
          </Button>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(Deposit);

export default res;
