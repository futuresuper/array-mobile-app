
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  Row,
  Col,
  Grid,
} from 'native-base';

// import CheckBox from 'src/Components/CheckBox';

import {
  styleGlobal,
} from 'src/Styles';

import composeHoc from 'src/Common/Hocs';
import {
  CheckBox,
} from 'src/Components/Form';

import styles from './styles';

class DirectDebitAuth extends React.Component {
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
      screenProps.navigateTo('SourceOfFunds');
    }
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder>
        <View style={styleGlobal.flex}>
          <Text style={styleGlobal.formHeading}>
            Confirming your inverstment details
          </Text>

          <Grid style={[styleGlobal.flexNull, styleGlobal.border]}>
            <Row style={[styleGlobal.flexNull, styleGlobal.borderBottom]}>
              <Col style={[styleGlobal.borderRight, styles.colLeftStyle]}>
                <Text>Initial investment</Text>
              </Col>
              <Col style={styles.colRightStyle}>
                <Text>$50 paid via direct debit from your bank account</Text>
              </Col>
            </Row>
            <Row style={[styleGlobal.flexNull, styleGlobal.borderBottom]}>
              <Col style={[styleGlobal.borderRight, styles.colLeftStyle]}>
                <Text>Regular investment</Text>
              </Col>
              <Col style={styles.colRightStyle}>
                <Text>$20 per month paid via direct debit from your bank account</Text>
              </Col>
            </Row>
            <Row style={[styleGlobal.flexNull]}>
              <Col style={[styleGlobal.borderRight, styles.colLeftStyle]}>
                <Text>Bank Account</Text>
              </Col>
              <Col style={styles.colRightStyle}>
                <Text>BSB: 923-100</Text>
                <Text>Bank: ING-100</Text>
                <Text>Account Number: 123456789</Text>
                <Text>Account Name: Joe and Jane Bioggs</Text>
              </Col>
            </Row>
          </Grid>

          <Text style={[styleGlobal.textCenter, styleGlobal.mV20]}>
            Please tick the below box to authorise our direct debit provider to debit your account
          </Text>

          <Grid>
            <Col style={styles.checkBoxCol}>
              {/* <CheckBox
                checked={this.state.checked}
                onPress={() => { this.setState({ checked: !this.state.checked }); }}
              /> */}
              <CheckBox
                formData={form}
                formKey="field"
                onPress={hocs.handleCheckBox}
              />
            </Col>
            <Col>
              <Text style={styles.textAgree}>
              I / We authorise Ezidebit Pty Ltd ACN 096 902 813
              (User ID No 165969, 303909, 301203, 234040, 234072, 428198)
              to debit my/our account at the Financial Institution identified above through the Bulk Electronic Clearing System (BECS),
              in accordance with this Direct Debit Request and as per the Ezidebit DDR Service Agreement.
              I / We authorise these payments to be debited at intervals and amounts as directed by Future Super for the Future Renewables Fund,
              as per the Terms and Conditions of the Future Super agreement and subsequent agreements.
              </Text>
            </Col>
          </Grid>


          <Button
            onPress={() => this.handlePress()}
            block
            style={styleGlobal.mV20}
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
])(DirectDebitAuth);

export default connect()(res);
