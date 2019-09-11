/* eslint-disable max-len */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { View, ScrollView } from 'react-native';
import { Button, Text, Footer } from 'native-base';

import { sg } from 'src/Styles';

import { routeNames } from 'src/Navigation';

import { userDataSave, applicationIdSelector } from 'src/Redux/Auth';
import { appContentSave } from 'src/Redux/AppContent';

import { finalConfirmation as styles } from './styles';

class FinalConfirmation extends React.Component {
  handlePress() {
    const { screenProps, applicationId, userDataSaveConnect, appContentSaveConnect } = this.props;
    const body = {
      accountId: applicationId,
      submittedApplication: true,
    };

    screenProps.Api.post(
      '/account',
      body,
      (res) => {

        this.getAppContent((appContent) => {
          const { user } = appContent;
          console.log(JSON.stringify(user));
          console.log(JSON.stringify(appContent));

          userDataSaveConnect(user);
          appContentSaveConnect(appContent);

          screenProps.navigateTo(routeNames.TAB_HOME, {
            accountId: applicationId,
          });
        });

        /*
        if (res.idCheckComplete) {
          screenProps.navigateTo(routeNames.TAB_HOME);
        } else {
          screenProps.navigateTo(routeNames.ID_CHECK);
          // screenProps.navigateTo(routeNames.ID_CHECK_FINISH);
        }
        */
      },
      () => {
        screenProps.toastDanger('Error. Try Again');
      },
    );
  }

  getAppContent(callback) {
    const { screenProps } = this.props;
    screenProps.Api.get('/appcontent', {}, callback, () => {
      screenProps.toast('Something went wrong. Please try refreshing your app, or contact us: hello@arrayapp.co');
    });
  }

  renderLi(text) {
    return (
      <View style={[sg.row, sg.mB10]}>
        <Text style={sg.fS11}>{'\u2022'}</Text>
        <Text style={[sg.fS10, sg.mL20]}>{text}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={[sg.flex, sg.backgroundDefault]}>
        <View style={[sg.contentPadding, sg.pB10]}>
          <Text style={[sg.formHeading]}>Final confirmation</Text>

          <Text>
            Once you click ‘Agree & Submit Application’, we will debit your&nbsp;
            <Text
              // style={sg.textBold}
            >bank account</Text>
            &nbsp;for your initial investment amount&nbsp;
            <Text style={sg.textBold} />
          </Text>

          <Text style={[sg.fS10, sg.textBold, sg.mT20]}>I make the following declarations:</Text>
        </View>

        <View style={styles.scrollContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator
            alwaysBounceVertical={false}
            indicatorStyle="black"
          >
            {this.renderLi(
              'I have read and understood the PDS to which this Application Form applies, including any supplemental information;',
            )}
            {this.renderLi(
              'I agree that by entering the PIN Code/SMS Code, which was provided to me, being the applicant, in a secure manner, is legally binding and equivalent to my handwritten signature;',
            )}
            {this.renderLi('I have received and accepted the offer to invest in Australia;')}
            {this.renderLi('I agree to receiving all communications electronically;')}
            {this.renderLi(
              'The information provided in my/our Application Form is true, correct and complete in all respects;',
            )}
            {this.renderLi(
              'I agree to be bound by the provisions of the Constitution governing the Fund and the terms and conditions of the PDS, each as amended from time to time;',
            )}
            {this.renderLi(
              'I confirm that the Issuer is authorized to treat this Application Form as an original of the Application Form which I have sent to Issuer by an electronic transmission, either in my personal capacity or as an authorized representative of the investor',
            )}
            {this.renderLi(
              'I agree that by submitting the electronically signed Application Form to the Issuer or its agent, the Application Form is deemed:',
            )}
            {this.renderLi('to be written or in writing;')}
            {this.renderLi('to have been signed by me/us; and')}
            {this.renderLi(
              'to be binding on me or us and constitute my/our confirmation as to the accuracy of my all information provided in the Application Form and my my/our consent to that information be provided to any third party that the Issuer deems it necessary to provide the information;',
            )}
            {this.renderLi(
              'I also acknowledge that if an electronic copy or printout of the Application Form is introduced as evidence in any judicial proceeding, it will be admissible as any original Application Form records;',
            )}
            {this.renderLi(
              'I acknowledge that none of the Issuer, their related entities, directors or officers have guaranteed or made any representation as to the performance or success of the Fund, or the repayment of capital from the Fund. Investments in the Fund are subject to various risks, including delays in repayment and loss of income or principal invested. Investments in the Fund are not deposits with or other liabilities of the Issuer or any of its related bodies corporate or associates;',
            )}
            {this.renderLi(
              'I acknowledge the Issuer reserves the right to reject any application or scale back an application in its absolute discretion;',
            )}
            {this.renderLi(
              'If applicable, after assessing my/our circumstances, I have obtained my/our own independent financial advice prior to investing in the Fund;',
            )}
            {this.renderLi(
              'If this Application Form is signed under Power of Attorney, each Attorney declares he/she has not received notice of revocation of that power (a certified copy of the Power of Attorney should be submitted with this Application Form);',
            )}
            {this.renderLi(
              'I am/we are over 18 years of age and I are eligible to hold units/investment in the Fund;',
            )}
            {this.renderLi(
              'I have all requisite power and authority to execute and perform the obligations under the PDS and this Application Form;',
            )}
            {this.renderLi(
              'I acknowledge that application monies will be held in a trust account until invested in the Fund or returned to me/us. Interest will not be paid to applicants in respect of their application monies regardless of whether their monies are returned;',
            )}
            {this.renderLi(
              'I have read the information on privacy and personal information contained in the PDS and consent to my/our personal information being used and disclosed as set out in the PDS;',
            )}
            {this.renderLi(
              'I acknowledge that the Issuer may deliver and make reports, statements and other communications available in electronic form, such as e-mail or by posting on a website;',
            )}
            {this.renderLi(
              'I indemnify the Issuer and each of its related bodies corporate, directors and other officers, shareholders, servants, employees, agents and permitted delegates (together, the Indemnified Parties) and to hold each of them harmless from and against any loss, damage, liability, cost or expense, including reasonable legal fees (collectively, a Loss) due to or arising out of a breach of representation, warranty, covenant or agreement by me/us contained in any document provided by me/us to the Issuer, its agents or other parties in connection with my/our investment in the Fund. The indemnification obligations provided herein survive the execution and delivery of this Application Form, any investigation at any time made by the Issuer and the issue and/or sale of the investment;',
            )}
            {this.renderLi(
              'To the extent permitted by law, I release each of the Indemnified Parties from all claims, actions, suits or demands whatsoever and howsoever arising that I may have against any Indemnified Party in connection with the PDS or my/our investment;',
            )}
            {this.renderLi(
              'Other than as disclosed in this Application Form, no person or entity controlling, owning or otherwise holding an interest in me/us is a United States citizen or resident of the United States or any other country for taxation purposes;',
            )}
            {this.renderLi(
              'I will promptly notify the Issuer of any change to the information I have previously provided to the Issuer, including any changes which result in a person or entity controlling, owning or otherwise holding an interest in me/us;',
            )}
            {this.renderLi(
              'I consent to the Issuer disclosing any information it has in compliance with its obligations under the US Foreign Account Tax Compliance Act (FATCA) and the OECD Common Reporting Standards for Automatic Exchange of Financial Account Information (CRS) and any related Australian law and guidance implementing the same. This may',
            )}
            {this.renderLi(
              'include disclosing information to the Australian Taxation Office, who may in turn report that information to the relevant tax authorities as required;',
            )}
            {this.renderLi(
              'I acknowledge that the collection of my/our personal information may be required by the Financial Transaction Reports Act 1988, the Corporations Act 2001, the Income Tax Assessment Act 1936, the Income Tax Assessment Act 1997, the Taxation Administration Act 1953, the FATCA and CRS (includes any related Australian law and guidance) and the Anti-Money Laundering and Counter-Terrorism Financing Act 2006. Otherwise, the collection of information is not required by law, but I acknowledge that if I do not provide personal information, the Issuer may not allow me/us to invest in the Fund;',
            )}
            {this.renderLi(
              'I am/we are not aware and have no reason to suspect that the monies used to fund my/our investment in the Fund have been or will be derived from or related to any money laundering, terrorism financing or similar or other activities illegal under applicable laws or regulations or otherwise prohibited under any international convention or agreement (AML/CTF Law);',
            )}
            {this.renderLi(
              'I will provide the Issuer with all additional information and assistance that the Issuer may request in order for the Issuer to comply with the AML/CTF Law, FATCA and CRS;',
            )}
            {this.renderLi(
              'I acknowledge that the Issuer may decide to delay or refuse any request or transaction, including by suspending the issue or redemption of investment in the Fund, if the Issuer is concerned that the request or transaction may breach any obligation of, or cause the Issuer to commit or participate in an offence (including under the AML/CTF Law, FATCA and CRS).',
            )}
          </ScrollView>
        </View>

        <Footer style={styles.finalConfFooter}>
          <View style={sg.flex}>
            <Button onPress={() => this.handlePress()} block full>
              <Text>Agree & Submit Application</Text>
            </Button>
          </View>
        </Footer>
      </View>
    );
  }
}

FinalConfirmation.propTypes = {
  applicationId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const applicationId = applicationIdSelector(state);
  return {
    applicationId,
  };
};

const mapDispatchToProps = {
  userDataSaveConnect: userDataSave,
  appContentSaveConnect: appContentSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FinalConfirmation);
