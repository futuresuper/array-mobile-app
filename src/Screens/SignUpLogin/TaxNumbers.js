
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

import { get } from 'lodash';
import {
  sg,
  sc,
} from 'src/Styles';

import { taxNumbers as styles } from './styles';

class TaxNumbers extends Component {
  constructor() {
    super();
    this.state = {
      form: {
        tfn: {
          validations: [[this.tfnValidator, 'Invalid TFN']],
        },
        usPerson: {
        },
        tins: [],
        usTin: {
        },
        resident: {
        },
        check: {
          validations: ['required'],
        },
      },
    };

    this.reasonValidator = this.reasonValidator.bind(this);
  }

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
        osTaxResident: form.resident.value,
        tins: form.resident.value ? form.tins.map((t) => ({
          country: t.country.value,
          tin: t.tin.value,
          unavailableReason: t.reasonDoesntExist.value,
          unavailableReasonOther: t.reasonOther.value,
        })) : '',
        certifiedAllTaxResidenciesProvided: form.check.value,
      };
      screenProps.Api.post('/user', body, () => {
        screenProps.navigateTo(routeNames.FINAL_CONFIRMATION);
      }, () => {
        screenProps.toastDanger('Error. Try Again');
      });
    }
  }

  tfnValidator(value) {
    let tfn = value.replace(/\s+/g, '');
    tfn = tfn.replace(/[-]/g, '');

    const isNumber = /^[0-9]+$/.test(tfn);
    if (!isNumber) {
      return true;
    }
    const { length } = tfn;
    if (length !== 9) {
      return true;
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
      return false;
    }
    return true;
  }

  // reason validator unreasonably complicated
  reasonValidator(value, key) {
    const { hocs } = this.props;
    const { form } = hocs;
    const arrayTarget = key.split('.').slice(0, -1);
    const tinForm = get(form, arrayTarget);
    if (!form.resident.value) {
      return false;
    }
    if (tinForm) {
      if (tinForm.reasonDoesntIssue.value
      || tinForm.reasonDoesntExist.value
      || tinForm.reasonOther.value) {
        return false;
      }
      return true;
    }
    return false;
  }

  addNewResidentForm(key) {
    const { hocs } = this.props;

    const intResObjSkeleton = {
      country: { validations: ['required'] },
      tin: { validations: [] },
      reasonDoesntIssue: { validations: [this.reasonValidator] },
      reasonDoesntExist: { validations: [this.reasonValidator] },
      reasonOther: { validations: [this.reasonValidator] },
    };
    hocs.addOrUpdateFormField(intResObjSkeleton, `tins.${key}`, 'collection');
  }

  // handles checkmark and adds appropriate validators and fields to hoc
  handleResidentSwich(formKey) {
    const { hocs } = this.props;
    const { form } = hocs;
    hocs.handleCheckBox(formKey);
    let targetFormKey;
    if (formKey === 'resident') {
      targetFormKey = 'tins';
      if (!form.tins.length) {
        this.addNewResidentForm(0);
      }
    } else {
      targetFormKey = 'usTin';
      const validator = form[formKey].value ? ['required'] : [];
      hocs.setFieldValidations(targetFormKey, validator);
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
        onPress={(e) => this.handleResidentSwich(e)}
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


    const residentForms = [];

    if (form && form.resident.value) {
      form.tins.forEach((tin, k) => {
        residentForms.push(
          // eslint-disable-next-line react/no-array-index-key
          <Grid key={k} style={[sg.borderedContainer, sg.p10, sg.mB10]}>
            <Row>
              <Input
                formData={form}
                formKey={`tins.${k}.country`}
                helper="Country of tax residence"
                onChangeText={hocs.handleInput}
              />
            </Row>
            <Row>
              <Input
                formData={form}
                formKey={`tins.${k}.tin`}
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
                formKey={`tins.${k}.reasonDoesntIssue`}
                onPress={hocs.handleCheckBox}
              />
              <Text style={[sg.colorGray11, sg.fontMedium, sg.fS14, sg.pL10, sg.pR20]}>
                {"THE COUNTRY WHERE THE ACCOUNT HOLDER IS LIABLE TO PAY TAX DOES NOT ISSUE TINS TO IT'S RESIDENTS."}
              </Text>
            </Row>
            <Row style={[sg.mT20]}>
              <CheckBox
                formData={form}
                formKey={`tins.${k}.reasonDoesntExist`}
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
                formKey={`tins.${k}.reasonOther`}
                helper="OTHER"
                onChangeText={hocs.handleInput}
              />
            </Row>
          </Grid>,
        );
      });
    }
    if (residentForms.length > 0) {
      return (
        <View style={[sg.mV20, sg.mH10]}>
          {residentForms}
          <Button bordered dark onPress={() => this.addNewResidentForm(residentForms.length + 1)} block>
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
