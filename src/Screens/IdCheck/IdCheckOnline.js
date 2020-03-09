

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
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';
import {
  CheckBox,
} from 'src/Components/Form';
import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import {
  sg,
} from 'src/Styles';

import { idCheckOnline as styles } from './styles';

class IdCheckOnline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
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

  onNext(idType) {
    const { screenProps, hocs } = this.props;

    if (hocs.form.check.value) {
      const body = {
        onlineIdConsent: true,
      };
      screenProps.Api.post('/user', body, () => {
        idType === "driversLicence" ?
        screenProps.navigateTo(routeNames.ID_CHECK_DRIVERS_LICENCE)
        : screenProps.navigateTo(routeNames.ID_CHECK_AUSTRALIAN_PASSPORT);
      }, () => {
        screenProps.toastDanger('Error. Try Again');
      });
    } else {
      screenProps.toastDanger('Please check the box to continue');
    }
  }

  renderLi(text, subLi = false) {
    const paddingLeft = sg.mL20;
    const style = subLi ? paddingLeft : {};

    return (
      <View style={[sg.row, sg.mT10, style]}>
        <Text style={sg.fS11}>{'\u2022'}</Text>
        <Text style={[styles.text, paddingLeft]}>{text}</Text>
      </View>
    );
  }

  render() {
    const { hocs } = this.props;
    const { form } = hocs;

    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View style={sg.mB20}>
            <Grid style={sg.mT20}>
              <Col style={sg.width50}>
                <CheckBox
                  formData={form}
                  formKey="check"
                  onPress={hocs.handleCheckBox}
                />
              </Col>
              <Col>
                <Text style={[styles.textBold]}>Please check my ID online</Text>
                <Text style={[styles.text, sg.mT10]}>
                  I understand that my details will be submitted to the Australian Government&apos;s Document Verification Service (DVS).
                  I understand that the ID document details will be checked against records held by the Issuer or Official Record Holder.
                </Text>
                <Text style={[styles.text, sg.mT10]}>
                  Specifically, as an investor:
                </Text>
                {this.renderLi('I have the legal capacity to understand and communicate any personal information required under this application,')}
                {this.renderLi('I have read and understood the privacy disclosure as detailed in the PDS and in this on-line application form,')}
                {this.renderLi('I consent to my personal information being collected, held, used and disclosed in accordance with the privacy disclosure voluntarily,')}
                {this.renderLi('I consent to the Issuer disclosing my personal information to any Issuer’s service providers, in relation to any identification and verification that the Issuer is required to undertake on me, as required under the AML/CTF Act. This shall include any information:')}
                {this.renderLi('required by any third party document verification service provider; and/or', true)}
                {this.renderLi('provided to any third party document verification service provider.', true)}
              </Col>
            </Grid>
          </View>
          <View>
            <Button
              onPress={() => this.onNext("driversLicence")}
              block
              marginVert
            >
              <Text>Add Drivers Licence</Text>
            </Button>
            <Button
              onPress={() => this.onNext("passport")}
              block
              marginVert
            >
              <Text>Add Passport</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}


const res = composeHoc([
  hocNames.FORM,
])(IdCheckOnline);

export default connect()(res);
