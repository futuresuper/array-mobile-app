
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

import ListLinks from 'src/Components/ListLinks';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
} from 'src/Components/Form';

class TaxFileNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        field: {
          validations: ['required', [this.tfnValidator, 'This field is required']],
        },
      },
    };
  }


  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  tfnValidator(value) {
    let tfn = value.replace(/\s+/g, '');
    tfn = tfn.replace(/[-]/g, '');

    const isNumber = /^[0-9]+$/.test(tfn);
    if (!isNumber) {
      return false;
    }
    const { length } = tfn;
    if (length !== 9) {
      return false;
    }
    const digits = tfn.split('');
    const sum = (digits[0] * 1)
        + (digits[1] * 4)
        + (digits[2] * 3)
        + (digits[3] * 7)
        + (digits[4] * 5)
        + (digits[5] * 8)
        + (digits[6] * 6)
        + (digits[7] * 9)
        + (digits[8] * 10);

    const remainder = sum % 11;

    if (remainder === 0) {
      return true;
    }
    return false;
  }

  handlePress() {
    const { hocs } = this.props;
    hocs.formIsValid();
  }

  render() {
    const { hocs, screenProps } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Your Tax File Number (TFN)
          </Text>

          <Input
            formData={form}
            formKey="field"
            placeholder="Tax File Number"
            onChangeText={hocs.handleInput}
          />
        </View>

        <KeyboardAvoidingView behavior="padding">
          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Next</Text>
          </Button>
          <Button
            onPress={() => this.handlePress()}
            block
            secondary
            style={styleGlobal.mT10}
          >
            <Text>Add TFN later</Text>
          </Button>

          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>

        <ListLinks
          absolute
          navigateTo={screenProps.navigateTo}
          data={[
            {
              name: 'Individual or Sole Trader',
              screen: 'FinalConfirmation',
            },
            {
              name: 'Joint',
              screen: 'JointInvestorDetails',
            },
          ]}
        />
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(TaxFileNumber);

export default connect()(res);
