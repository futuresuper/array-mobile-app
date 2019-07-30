
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  Grid,
  Col,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
  CheckBox,
} from 'src/Components/Form';

import {
  routeNames,
} from 'src/Navigation';

class BankAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        accountName: {
          validations: ['required'],
        },
        bsb: {
          validations: ['required'],
        },
        accountNumber: {
          validations: ['required'],
        },
        authority: {
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
      screenProps.navigateTo(routeNames.ID_CHECK_ONLINE);
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View style={sg.mB20}>
            <Text style={sg.formHeading}>
              Link bank account
            </Text>

            <Input
              formData={form}
              formKey="bsb"
              helper="BSB"
              onChangeText={hocs.handleInput}
            />

            <Input
              formData={form}
              formKey="accountNumber"
              helper="Account number"
              onChangeText={hocs.handleInput}
            />

            <Input
              formData={form}
              formKey="accountName"
              helper="Bank account name"
              onChangeText={hocs.handleInput}
            />

            <Grid style={sg.mT20}>
              <Col style={sg.width50}>
                <CheckBox
                  formData={form}
                  formKey="authority"
                  onPress={hocs.handleCheckBox}
                />
              </Col>
              <Col>
                <Text style={[sg.textBold, sg.fS10]}>Provide authority to direct debit your bank account</Text>
                <Text style={[sg.fS10, sg.mT10]}>
                  I authorise Ezidebit Pty Ltd ACN 096 902 813 (User ID No 165969, 303909, 301203, 234040, 234072, 428198)
                  to debit my account at the Financial Institution identified above through the Bulk Electronic Clearing System (BECS),
                  in accordance with this Direct Debit Request and as per the Ezidebit DDR Service Agreement.
                  I authorise these payments to be debited at intervals and amounts as directed by Future Super for the Future Renewables Fund,
                  as per the Terms and Conditions of the Future Super agreement and subsequent agreements.
                </Text>
              </Col>
            </Grid>

          </View>

          <Button
            onPress={() => this.handlePress()}
            block
          >
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(BankAccount);

export default connect()(res);
