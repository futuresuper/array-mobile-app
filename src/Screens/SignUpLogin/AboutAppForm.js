import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Linking } from 'react-native';

import { Content, Text, Button } from 'native-base';

import { routeNames } from 'src/Navigation';

import { sg } from 'src/Styles';

import { aboutAppForm as styles } from './styles';

class AboutAppForm extends Component {
  onNext() {
    console.log('11111111')
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.IMPORTANT_INFO);
  }

  clickOnLink() {
    Linking.openURL('https://www.futurerenewablesfund.com.au/pds');
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>

            <Text style={[styles.description, sg.textBold]}>
              ABOUT THIS APPLICATION FORM
            </Text>

            <Text style={styles.descriptionP}>
              This Application Form accompanies the &nbsp;
              <Text onPress={() => this.clickOnLink()} style={styles.descriptionUnderline}>
                Product Disclosure Statement
              </Text>
              &nbsp; dated 8 March 2019 (PDS) issued by One Managed Investment Funds Limited ABN 47
              117 400 987 (Issuer) in its capacity as responsible entity of the Future Renewables
              Fund (ARSN 628 987 842) (Fund). It is important that you read the
              {' '}
              <Text onPress={() => this.clickOnLink()} style={styles.descriptionUnderline}>
                PDS
              </Text>
              {' '}
              in full before
              investing.
            </Text>

            <Text style={styles.descriptionP}>
              Before deciding to invest in Future Renewables Fund (Fund) you should carefully
              consider your investment and financial objectives, level of experience, and risk
              appetite as set out in the relevant
              {' '}
              <Text onPress={() => this.clickOnLink()} style={styles.descriptionUnderline}>
                Product Disclosure Statement (PDS)
              </Text>
              {' '}
              issued by One
              Managed Investment Funds Limited (OMIFL).
            </Text>

            <Text style={styles.descriptionP}>
              As an investor, you acknowledge that the investment in the Fund is subject to a degree
              of risk as disclosed in the
              {' '}
              <Text onPress={() => this.clickOnLink()} style={styles.descriptionUnderline}>
                PDS
              </Text>
              . No guarantees, either expressed or implied, are made
              that the investment strategies described herein will perform as they are intended. The
              fact the investment strategies described herein may have performed well in the past
              does not assure similar results in the future. There are no assurances that the Fund
              will be able to achieve its objectives.
            </Text>

            <Text style={styles.descriptionP}>
              There are no loss limits or diversification requirements imposed upon the Fund except
              as expressly set forth in the Fund’s
              {' '}
              <Text onPress={() => this.clickOnLink()} style={styles.descriptionUnderline}>
                PDS
              </Text>
              .
            </Text>
          </View>
          <View>
            <Button onPress={() => this.onNext()} block>
              <Text>Next</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(AboutAppForm);
