
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
} from 'react-native';

import {
  Content,
  Text,
  Button,
  Grid,
  Col,
  Row,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';
import {
  Input,
  Switch,
  CheckBox,
} from 'src/Components/Form';
import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import {
  sg,
  sc,
} from 'src/Styles';

import { taxNumbers as styles } from './styles';

class TaxNumbers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        tfn: {
          validations: ['required'],
        },
        usPerson: {
        },
        resident: {
        },
        check: {
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

  onNext() {
    const { screenProps, hocs } = this.props;

    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      const body = {
        taxFileNumber: hocs.form.tfn.value,
        usPerson: hocs.form.usPerson.value === '' ? false : true,
        osTaxResident: hocs.form.resident.value === '' ? false : true,
        certifiedAllTaxResidenciesProvided: hocs.form.check.value,
      };
      screenProps.Api.post('/user', body, () => {
        screenProps.navigateTo(routeNames.FINAL_CONFIRMATION);
      }, () => {
        screenProps.toastDanger('Error. Try Again');
      });
    }
  }

  renderSwitch(formKey) {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Switch
        pure
        formData={form}
        formKey={formKey}
        onPress={hocs.handleCheckBox}
        ios_backgroundColor={sc.color.gray12}
        trackColor={{
          false: sc.color.gray12,
        }}
        style={sg.mT0}
      />
    );
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={sg.formHeading}>
              Tax Numbers
            </Text>

            <Input
              formData={form}
              formKey="tfn"
              helper="Your Australian Tax File Number (TFN)"
              onChangeText={hocs.handleInput}
            />

            <Grid style={sg.mT70}>
              <Row>
                <Col>
                  <Text style={[sg.colorGray11, sg.fontMedium, sg.fS14]}>Are you a US Person?</Text>
                  <Text style={[sg.fS10, sg.mT10]}>A U.S. person includes a U.S Citizen or resident align of the U.S even if residing outside the U.S.</Text>
                </Col>
                <Col style={styles.switchCol}>
                  {this.renderSwitch('usPerson')}
                </Col>
              </Row>

              <Row style={sg.mT40}>
                <Col>
                  <Text style={[sg.colorGray11, sg.fontMedium, sg.fS14]}>Are you a resident for tax purposes of any other country?</Text>
                </Col>
                <Col style={styles.switchCol}>
                  {this.renderSwitch('resident')}
                </Col>
              </Row>
            </Grid>
          </View>

          <View>
            <Grid style={sg.mB25}>
              <Col style={sg.width50}>
                <CheckBox
                  formData={form}
                  formKey="check"
                  onPress={hocs.handleCheckBox}
                />
              </Col>
              <Col>
                <Text style={[sg.textBold, sg.fS10]}>
                  I certify the tax residence countries provided represent all countries in which I am considered a tax resident.
                </Text>
              </Col>
            </Grid>


            <Button
              onPress={() => this.onNext()}
              block
            >
              <Text>Next</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  hocNames.FORM,
])(TaxNumbers);

export default connect()(res);
