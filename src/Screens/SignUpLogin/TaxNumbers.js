
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
    state = {
      form: {
        tfn: {
          validations: ['required'],
        },
        usPerson: {
        },
        tins: {},
        usTin: {
        },
        resident: {
        },
        check: {
          validations: ['required'],
        },
      },
    };

    componentDidMount() {
      const { hocs } = this.props;
      const { form } = this.state;

      hocs.setForm(form);
    }

    onNext() {
      const { screenProps, hocs } = this.props;
      const { form } = hocs;

      const formIsValid = hocs.formIsValid();
      if (formIsValid) {
        const body = {
          taxFileNumber: form.tfn.value,
          usPerson: form.usPerson.value !== '',
          usTin: form.usTin.value,
          osTaxResident: form.resident.value !== '',
          certifiedAllTaxResidenciesProvided: form.check.value,
        };
        screenProps.Api.post('/user', body, () => {
          screenProps.navigateTo(routeNames.FINAL_CONFIRMATION);
        }, () => {
          screenProps.toastDanger('Error. Try Again');
        });
      }
    }

    // handles checkmark and adds appropriate validators to hoc
    handleResidentSwich(e) {
      const { hocs } = this.props;
      const { form } = hocs;
      hocs.handleCheckBox(e);
      const targetFormKey = e === 'usPerson' ? 'usTin' : 'tins';
      const validator = form[e].value ? ['required'] : [];
      hocs.setFieldValidations(targetFormKey, validator);
    }

    renderSwitch(formKey) {
      const { hocs } = this.props;
      const { form } = hocs;

      return (
        <Switch
          pure
          formData={form}
          formKey={formKey}
          onPress={e => this.handleResidentSwich(e)}
          ios_backgroundColor={sc.color.gray12}
          trackColor={{
            false: sc.color.gray12,
          }}
          style={sg.mT0}
        />
      );
    }


    renderUsResidentTin() {
      const { hocs } = this.props;
      const { form } = hocs;
      if (form && form.usPerson.value) {
        return (
          <Input
            formData={form}
            formKey="usTin"
            helper="Your US Tax Indetification Number (TIN)"
            onChangeText={hocs.handleInput}
          />
        );
      }
      return null;
    }

    renderInternationalResidentTin() {
      const { hocs } = this.props;
      const { form } = hocs;
      if (form && form.resident.value) {
        return (
          <View style={[sg.mV20, sg.mH10]}>
            <Grid style={[sg.borderedContainer, sg.p10, sg.mB10]}>
              <Row>
                <Input
                  formData={form}
                  formKey="tins"
                  helper="Country of tax residence"
                  onChangeText={hocs.handleInput}
                />
              </Row>
              <Row>
                <Input
                  formData={form}
                  formKey="tins"
                  helper="TIN/TFN"
                  onChangeText={hocs.handleInput}
                />
              </Row>
              <Row>
                <Text style={[sg.colorGray11, sg.fontMedium, sg.fS14]}>Or Select a reason that TIN/TFN is unavailable:</Text>
              </Row>
              <Row style={[sg.mT20]}>
                <CheckBox
                  formData={form}
                  formKey="tins"
                  onPress={hocs.handleCheckBox}
                />
                <Text style={[sg.colorGray11, sg.fontMedium, sg.fS14, sg.pL10, sg.pR20]}>
                  {"THE COUNTRY WHERE THE ACCOUNT HOLDER IS LIABLE TO PAY TAX DOES NOT ISSUE TINS TO IT'S RESIDENTS."}
                </Text>
              </Row>
              <Row style={[sg.mT20]}>
                <CheckBox
                  formData={form}
                  formKey="tins"
                  onPress={hocs.handleCheckBox}
                />
                <Text style={[sg.colorGray11, sg.fontMedium, sg.fS14, sg.pL10, sg.pR20]}>
                  {'NO TIN IS REQUIRED.(NOTE: ONLY SELECT THIS REASON IF THE DOMESTIC LAW OF THE RELEVANT '}
                  {'JURISDICTION DOES NOT REQUIRE THE COLLECTION OF THE TIN ISSUED BY SUCH JURISDICTION'}
                </Text>
              </Row>
              <Row style={[sg.mT10]}>
                <Input
                  containerStyle={sg.pH20}
                  formData={form}
                  formKey="tins"
                  helper="OTHER"
                  onChangeText={hocs.handleInput}
                />
              </Row>
            </Grid>
            <Button bordered dark onPress={() => this.onNext()} block>
              <Text>+ Add Another</Text>
            </Button>
          </View>
        );
      }
      return null;
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
                {this.renderUsResidentTin()}
                <Row style={sg.mT40}>
                  <Col>
                    <Text style={[sg.colorGray11, sg.fontMedium, sg.fS14]}>Are you a resident for tax purposes of any other country?</Text>
                  </Col>
                  <Col style={styles.switchCol}>
                    {this.renderSwitch('resident')}
                  </Col>
                </Row>
                {this.renderInternationalResidentTin()}
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
              <Button onPress={() => this.onNext()} block>
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
