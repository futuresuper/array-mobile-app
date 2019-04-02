
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

class Withdraw extends Component {
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
        into: {
          validations: [
            'required',
          ],
        },
      },
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
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;
    const { accountList, frequencyList } = this.state;

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
            title="Liv"
            list={accountList}
            renderItem={({ item }) => (
              <View>
                <Text style={sg.pickerItemText}>{item.name}</Text>
                <Text style={sg.pickerItemText2}>{item.number}</Text>
              </View>
            )}
            onPressItem={({ item }, formKey, dataKey) => {
              hocs.handlePicker(item.number, formKey, dataKey);
              hocs.setFormTitle(item.number, formKey, dataKey);
            }}
          />
        </Item>

        <Item>
          <Picker
            formData={form}
            formKey="into"
            label="Into"
            title="ING account"
            list={accountList}
            renderItem={({ item }) => (
              <View>
                <Text style={sg.pickerItemText}>{item.name}</Text>
                <Text style={sg.pickerItemText2}>{item.number}</Text>
              </View>
            )}
            onPressItem={({ item }, formKey, dataKey) => {
              hocs.handlePicker(item.number, formKey, dataKey);
              hocs.setFormTitle(item.number, formKey, dataKey);
            }}
          />
        </Item>


      </View>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(Withdraw);

export default res;
