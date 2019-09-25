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
            <Text style={[sg.fS12, sg.textBold, sg.mV20]}>By completing this form I declare that:</Text>
            <View style={styles.scrollContainer}>
              <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator
                alwaysBounceVertical={false}
                indicatorStyle="black"
              >
                {this.renderLi('I have received all of the information I require in order to exercise the choices I have made. All the details I have provided in this application form are true and correct. ')}
                {this.renderLi('I have made an informed decision because I have read and understood the PDS, Additional Information Booklet, Insurance Guide and Privacy policy to which this application applies.')}
                {this.renderLi('By providing my email address, I consent and authorise Future Super to send communications or information, including information required by law, to me via email or similar technologies.')}
                {this.renderLi('I have selected an investment option and understand that 100% of the balance of my Future Super account will be invested in the option that I selected.')}
                {this.renderLi('I acknowledge that no representations have been made to me by or on behalf of Future Super other than those contained in the PDS.')}
                {this.renderLi('I accept that I will be bound by the provisions of the trust deed and rules which govern the operations of Future Super.')}
                {this.renderLi('I understand the nature of the risks attached to the investments I am applying for and acknowledge that neither Future Super, nor the Trustee of the Fund, guarantee a return of capital or the performance of my investment.')}

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
                {'I consent to Future Super Investment Services Pty Ltd, in its role as Fund Promoter, receiving a portion of the management fees (being the total fees and costs charged to members of Future Super) equal to the balance of the total fee minus the investment and administration fees and the fund expense and operational risk reserves accrued in the calculation of the unit price. This fee is estimated to be approximately 0.283% of the funds under management per annum for the 2019-20 financial year.'}
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
            {'Our Future Super team will get in touch in the next few days, to assist you with setting up your account and rolling in your other super.'}
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
