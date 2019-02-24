/* eslint-disable max-len */

import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
  Footer,
  Grid,
  Col,
  Row,
} from 'native-base';

import {
  styleGlobal,
} from 'src/Styles';

import CheckBox from 'src/Components/CheckBox';
import ListText from 'src/Components/ListText';

import styles from './styles';

const declarations = [
  'I/we have received and accepted the offer to invest in Australia;',
  'The information provided in my/our Application Form is true, correct and complete in all respects;',
  'I/we agree to be bound by the provisions of the Constitution governing the Fund and the terms and conditions of the PDS, each as amended from time to time;',
  'I/we acknowledge that none of the Issuer, their related entities, directors or officers have guaranteed or made any representation as to the performance or success of the Fund, or the repayment of capital from the Fund. Investments in the Fund are subject to various risks, including delays in repayment and loss of income or principal invested. Investments in the Fund are not deposits with or other liabilities of the Issuer or any of its related bodies corporate or associates;',
  'I/we acknowledge the Issuer reserves the right to reject any application or scale back an application in its absolute discretion;',
  'If applicable, after assessing my/our circumstances, I/we have obtained my/our own independent financial advice prior to investing in the Fund;',
  'If this Application Form is signed under Power of Attorney, each Attorney declares he/she has not received notice of revocation of that power (a certified copy of the Power of Attorney should be submitted with this Application Form);',
  'I am/we are over 18 years of age and I/we are eligible to hold units/investment in the Fund;',
  'I/we have all requisite power and authority to execute and perform the obligations under the PDS and this Application Form;',
  'I/we acknowledge that application monies will be held in a trust account until invested in the Fund or returned to me/us. Interest will not be paid to applicants in respect of their application monies regardless of whether their monies are returned;',
  'I/we have read the information on privacy and personal information contained in the PDS and consent to my/our personal information being used and disclosed as set out in the PDS;',
  'I/we acknowledge that the Issuer may deliver and make reports, statements and other communications available in electronic form, such as e-mail or by posting on a website;',
  'I/we indemnify the Issuer and each of its related bodies corporate, directors and other officers, shareholders, servants, employees, agents and permitted delegates (together, the Indemnified Parties) and to hold each of them harmless from and against any loss, damage, liability, cost or',
];

class FinalConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticks: {
        one: false,
        two: false,
        three: false,
      },
    };
  }

  onTick(type) {
    const { ticks } = this.state;
    this.setState({
      ticks: {
        ...ticks,
        [type]: !ticks[type],
      },
    });
  }

  handlePress() {
    const { screenProps } = this.props;
    screenProps.navigateTo('JoinSuper');
  }

  render() {
    const { ticks } = this.state;

    return (
      <View style={[styleGlobal.flex, styleGlobal.backgroundDefault, styleGlobal.p10]}>
        <Text style={styleGlobal.formHeading}>
          Final confirmation
        </Text>
        <Content padder>
          <Grid>
            <Row>
              <Col style={styles.checkBoxCol}>
                <CheckBox checked={ticks.one} onPress={() => this.onTick('one')} />
              </Col>
              <Col>
                <Text style={styles.textAgree}>
                I/we have read and understood the PDS to which this Application Form applies,
                including any supplemental information
                </Text>
              </Col>
            </Row>
            <Row style={styleGlobal.mV20}>
              <Col style={styles.checkBoxCol}>
                <CheckBox checked={ticks.two} onPress={() => this.onTick('two')} />
              </Col>
              <Col>
                <Text style={styles.textAgree}>
                I/we agree to receiving all communications electronically,
                and I/we wish to receive updates and information about future investment opportunities from Future Super
                </Text>
              </Col>
            </Row>
            <Row>
              <Col style={styles.checkBoxCol}>
                <CheckBox checked={ticks.three} onPress={() => this.onTick('three')} />
              </Col>
              <Col>
                <Text style={[styles.textAgree, styleGlobal.mB10]}>I/we make the following declarations:</Text>
                <ListText
                  textStyle={styles.textAgree}
                  data={declarations}
                />
              </Col>
            </Row>
          </Grid>
        </Content>
        <Footer style={styles.finalConfFooter}>
          <View style={styleGlobal.flex}>
            <Button
              onPress={() => this.handlePress()}
              block
              full
            >
              <Text>Next</Text>
            </Button>
          </View>
        </Footer>
      </View>
    );
  }
}

export default connect()(FinalConfirmation);
