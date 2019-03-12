
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
  Segment,
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

import styles from './styles';

const regularDebitFrequency = {
  WEEKLY: 'weekly',
  FORTNIGHTLY: 'fortnightly',
  MONTHLY: 'monthly',
};

class RegularInvestmentAmount extends React.Component {
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
        regular_debit_frequency: {
          value: regularDebitFrequency.WEEKLY,
        },
      },
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  handleFrequency = (type) => {
    const { hocs } = this.props;
    hocs.setFormValue(type, 'regular_debit_frequency');
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo('BankAccount');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validationRule(value) {
    if (value < 5 || value > 5000) {
      return false;
    }

    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  noRegularInvestment() {
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;
    const freq = {
      isW: form && (form.regular_debit_frequency.value === regularDebitFrequency.WEEKLY),
      isF: form && (form.regular_debit_frequency.value === regularDebitFrequency.FORTNIGHTLY),
      isM: form && (form.regular_debit_frequency.value === regularDebitFrequency.MONTHLY),
    };

    return (
      <Content padder contentContainerStyle={styleGlobal.spaceBetween}>
        <View>
          <Text style={styleGlobal.formHeading}>
            Regular Investment Amount
          </Text>

          <Text style={[styleGlobal.textCenter, styleGlobal.colorGray]}>
            Set up an automatic direct debit into your account, from your bank account
          </Text>

          <Segment style={styles.segment}>
            <Button
              first
              active
              style={[styles.segmentButton, (freq.isW ? styles.segmentButtonActive : {})]}
              onPress={() => { this.handleFrequency(regularDebitFrequency.WEEKLY); }}
            >
              <Text style={freq.isW ? styles.segmentButtonTextActive : null}>Weekly</Text>
            </Button>
            <Button
              active
              style={[styles.segmentButton, (freq.isF ? styles.segmentButtonActive : {})]}
              onPress={() => { this.handleFrequency(regularDebitFrequency.FORTNIGHTLY); }}
            >
              <Text style={freq.isF ? styles.segmentButtonTextActive : null}>Fortnightly</Text>
            </Button>
            <Button
              last
              active
              style={[styles.segmentButton, (freq.isM ? styles.segmentButtonActive : {})]}
              onPress={() => { this.handleFrequency(regularDebitFrequency.MONTHLY); }}
            >
              <Text style={freq.isM ? styles.segmentButtonTextActive : null}>Monthly</Text>
            </Button>
          </Segment>

          <Input
            formData={form}
            formKey="field"
            placeholder="Regular Investment Amount"
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
            onPress={() => this.noRegularInvestment()}
            block
            secondary
            style={styleGlobal.mT10}
          >
            <Text>No Regular Investment</Text>
          </Button>

          <View style={{ height: styleConstants.keyboardAvoidingHeight }} />
        </KeyboardAvoidingView>
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(RegularInvestmentAmount);

export default connect()(res);
