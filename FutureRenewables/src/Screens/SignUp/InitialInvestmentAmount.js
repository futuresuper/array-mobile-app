
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

import {
  formatAmountDollar,
  normalizeAmount,
} from 'src/Common/Helpers';

class InitialInvestmentAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        field: {
          validations: [
            'required',
            this.validationRule,
          ],
          normalize: normalizeAmount,
          format: formatAmountDollar,
        },
      },
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  // eslint-disable-next-line class-methods-use-this
  validationRule(value) {
    if (value < 5 || value > 1000000) {
      return false;
    }

    return true;
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo('RegularInvestmentAmount');
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Initial Investment Amount
          </Text>

          <Input
            formData={form}
            formKey="field"
            placeholder="Investment Amount"
            onChangeText={hocs.handleInput}
            keyboardType="numeric"
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
])(InitialInvestmentAmount);

export default connect()(res);
