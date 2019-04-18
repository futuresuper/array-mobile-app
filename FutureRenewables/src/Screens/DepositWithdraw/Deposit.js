
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  Text,
  Item,
  Icon,
} from 'native-base';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
  Picker,
} from 'src/Components/Form';
import {
  routeNames,
} from 'src/Navigation';

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
        },
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
    const { hocs } = this.props;
    const { form } = hocs;
    const { frequencyList } = this.state;
    let { accountList } = this.state;

    accountList = accountList.concat([{
      id: 'custom',
      name: 'Add account',
    }]);

    return (
      <View>
        <Input
          formData={form}
          formKey="amount"
          onChangeText={hocs.handleInput}
          keyboardType="numeric"
          iconLeft={{
            type: 'FontAwesome',
            name: 'dollar',
          }}
        />

        <Item>
          <Picker
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
                    <Text style={sg.pickerItemText}>{item.name}</Text>
                    <Icon name="add" />
                  </View>
                );
              }

              return (
                <View>
                  <Text style={sg.pickerItemText}>{item.name}</Text>
                  <Text style={sg.pickerItemText2}>{item.number}</Text>
                </View>
              );
            }}
            onPressItem={({ item }, formKey, dataKey) => {
              hocs.handlePicker(item.number, formKey, dataKey);
              hocs.setFormTitle(item.number, formKey, dataKey);
            }}
          />
        </Item>

        <Item>
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
            onInit={(formKey, dataKey) => {
              const item = frequencyList[0];

              hocs.handlePicker(item.value, formKey, dataKey);
              hocs.setFormTitle(item.name, formKey, dataKey);
            }}
            onPressItem={({ item }, formKey, dataKey) => {
              hocs.handlePicker(item.value, formKey, dataKey);
              hocs.setFormTitle(item.name, formKey, dataKey);
            }}
          />
        </Item>

      </View>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(Deposit);

export default res;
