
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Text,
  Item,
} from 'native-base';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
  Picker,
} from 'src/Components/Form';
import TextUnderline from 'src/Components/TextUnderline';
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

class Withdraw extends Component {
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
    const { accountList } = this.state;

    return (
      <Content padder contentContainerStyle={[sg.flexGrow]}>
        <View style={sg.spaceBetween}>
          <View>
            <Input
              formData={form}
              formKey="amount"
              onChangeText={hocs.handleInput}
              keyboardType="numeric"
              style={[sg.fS24]}
              color2
              componentRight={<Text color4>Available: $2,901.50</Text>}
            />

            <Item
              style={[sg.noBorder]}
            >
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

            <Item
              style={[sg.noBorder]}
            >
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

            <Text style={[sg.mT30]}>
              Withdrawal offers are currently
              &nbsp;
              <Text style={sg.textBold}>open</Text>
              .
              For more info on how withdrawls work,
            </Text>
            <TextUnderline
              theme2
              style={[sg.aSStart]}
              styleText={[sg.fS16]}
            >
              read more here.
            </TextUnderline>

          </View>
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(Withdraw);

export default connect()(res);
