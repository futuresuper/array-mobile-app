
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

import styles from './styles';

class RegularInvestmentAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        field: {
          validations: ['required'],
        },
      },
    };
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  handlePress() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      screenProps.navigateTo('BankAccount');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  noRegularInvestment() {
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

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
            <Button first active style={[styles.segmentButton, styles.segmentButtonActive]}>
              <Text style={styles.segmentButtonTextActive} >Weekly</Text>
            </Button>
            <Button active style={styles.segmentButton}>
              <Text>Fortnightly</Text>
            </Button>
            <Button last active style={styles.segmentButton}>
              <Text>Monthly</Text>
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
