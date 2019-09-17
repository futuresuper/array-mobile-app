/* eslint-disable max-len */

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  ScrollView,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  Col,
  Grid,
} from 'native-base';
import { composeHoc, hocNames } from 'src/Common/Hocs';
import { Picker, CheckBox } from 'src/Components/Form';
import { routeNames } from 'src/Navigation';
import {
  sg,
} from 'src/Styles';
import { joinFutureForm as styles } from './styles';


class JoinFutureForm extends React.Component {
  state = {
    form: {
      gender: { validations: ['required'] },
      investmentOption: { validations: ['required'] },
      appSubmitted: { validations: ['required'] },
      check: { validations: ['required'] },
    },
    genderList: [
      { value: 'Male', name: 'Male' },
      { value: 'Female', name: 'Female' },
      { value: 'Transgender', name: 'Transgender' },
      { value: 'Intersex', name: 'Intersex' },
      { value: 'Other', name: 'Other' },
    ],
    investmentOptionList: [
      { value: 'renewablesPlus', name: 'Renewables Plus Growth' },
      { value: 'balancedImpact', name: 'Balanced Impact' },
      { value: 'balancedIndex', name: 'Balanced Index' },
    ],
    submitSuccess: false,
  }

  componentDidMount() {
    const { hocs } = this.props;
    const { form } = this.state;

    hocs.setForm(form);
  }

  handleSubmit() {
    const { screenProps, hocs } = this.props;
    const formIsValid = hocs.formIsValid();
    if (formIsValid) {
      const body = {
        fsGender: hocs.form.gender.value,
        fsInvestmentOption: hocs.form.investmentOption.value,
      };
      screenProps.Api.post('/user', body, () => {
        this.setState({ submitSuccess: true });
      }, () => {
        screenProps.toastDanger('Error. Try Again');
      });
    }
  }

  handleNext() {
    const { screenProps } = this.props;
    const { account, navigateTo } = screenProps;
    if (account.status === 'awaitingIdCheckAndMoney') {
      navigateTo(routeNames.ID_CHECK);
    } else {
      navigateTo(routeNames.TAB_HOME);
    }
  }

  renderLi(text) {
    return (
      <View style={[sg.row, sg.mB10]}>
        <Text style={sg.fS12}>{'\u2022'}</Text>
        <Text style={[sg.fS12, sg.mL20]}>{text}</Text>
      </View>
    );
  }

  renderForm() {
    const { hocs } = this.props;
    const { form } = hocs;
    const { genderList, investmentOptionList } = this.state;
    return (
      <View style={sg.spaceBetween}>
        <View>
          <View>
            <Text style={sg.formHeading}>
              {'Join Future Super'}
            </Text>
            <Text>
              {'We only need a few extra things for your Future Super application.'}
            </Text>
          </View>
          <View style={sg.mT25}>
            <Picker
              formData={form}
              formKey="gender"
              helper="Gender"
              title="Gender"
              list={genderList}
              renderItem={({ item }) => (
                <View>
                  <Text style={[sg.pickerItemText, sg.fS14]}>{item.name}</Text>
                </View>
              )}
              onPressItem={({ item }, formKey) => {
                hocs.addOrUpdateFormField({ title: item.name, value: item.name }, formKey);
              }}
            />
            <Picker
              formData={form}
              formKey="investmentOption"
              helper="Investment Option (You can change this later)"
              title="Investment Option"
              list={investmentOptionList}
              renderItem={({ item }) => (
                <View>
                  <Text style={[sg.pickerItemText, sg.fS14]}>{item.name}</Text>
                </View>
              )}
              onPressItem={({ item }, formKey) => {
                hocs.addOrUpdateFormField({ title: item.name, value: item.name }, formKey);
              }}
            />
            <Text style={[sg.fS12, sg.textBold, sg.mV20]}>I make the following declarations:</Text>
            <View style={styles.scrollContainer}>
              <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator
                alwaysBounceVertical={false}
                indicatorStyle="black"
              >
                {this.renderLi('All the details I have provided are true and correct.')}
                {this.renderLi('I have read and understood the Product Disclosure Statement, Additional Information Booklet, Insurance Guide, Financial Services Guide, Privacy Policy and other important information about joining Future Super.')}
                {this.renderLi('By providing my email address, I consent and authorise Future Super to send communications or information in electronic format, including information required by law, to you via email or similar technologies.')}
                {this.renderLi('I have chosen an investment option and I understand that 100% of the balance of my Future Super account will be invested in the investment option I chose.')}
              </ScrollView>
            </View>
          </View>
        </View>
        <View>
          <Grid style={sg.mV25}>
            <Col style={sg.width50}>
              <CheckBox
                formData={form}
                formKey="check"
                onPress={hocs.handleCheckBox}
              />
            </Col>
            <Col>
              <Text style={[sg.fS12]}>
                {'I have read, understood and agree to the above declaration.'}
              </Text>
            </Col>
          </Grid>
          <Grid style={sg.mB25}>
            <Col style={sg.width50}>
              <CheckBox
                formData={form}
                formKey="appSubmitted"
                onPress={hocs.handleCheckBox}
              />
            </Col>
            <Col>
              <Text style={[sg.fS12]}>
                {'I consent to Future Super Services Pty Ltd receiving a fee from Future Super that is the balance of the total fee minus the investment and administration fees and the fund expense and operational risk reserves accrued in the calculation of the unit price. This fee is estimated to be approximately 0.263% of the funds under management per annum for the 2018-19 financial year.'}
              </Text>
            </Col>
          </Grid>
          <Button onPress={() => this.handleSubmit()} block>
            <Text>Submit Future Super Application</Text>
          </Button>
        </View>
      </View>
    );
  }

  renderSuccessMessage = () => (
    <View style={sg.spaceBetween}>
      <View>
        <View style={[sg.left]}>
          <Text style={sg.formHeading}>
            {'Thanks for joining Future Super!'}
          </Text>
          <Text>
            {'You’ll get an email from our Future Super team in the next few days, to assist you with setting up your account and rolling in your other super.'}
          </Text>
        </View>
      </View>
      <View>
        <Button onPress={() => this.handleNext()} block marginVert>
          <Text>Got it!</Text>
        </Button>
      </View>
    </View>
  )

  render() {
    const { submitSuccess } = this.state;

    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        {submitSuccess ? this.renderSuccessMessage() : this.renderForm()}
      </Content>
    );
  }
}

const res = composeHoc([
  hocNames.FORM,
])(JoinFutureForm);

export default connect()(res);
