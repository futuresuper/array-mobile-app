import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Linking } from 'react-native';

import { Content, Text, Button } from 'native-base';

import { routeNames } from 'src/Navigation';

import { sg } from 'src/Styles';

import { aboutAppForm as styles } from './styles';

class ImportantInfo extends Component {
  onNext() {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.ACCOUNT_TYPE);
  }

  clickOnLink() {
    Linking.openURL('https://www.futurerenewablesfund.com.au/pds');
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={[sg.spaceBetween]}>
          <View>
            <Text style={[styles.descriptionP, sg.textBold]}>
              IMPORTANT THINGS TO KNOW
            </Text>
            <Text style={styles.descriptionP}>
              FEES
            </Text>
            <Text style={styles.descriptionP}>
              Management Fee: 0.86% per annum of Net Asset Value (inclusive of GST and net of any input tax credits).
            </Text>
            <Text style={styles.descriptionP}>
              Indirect costs: 0.13% per annum of Net Asset Value (inclusive of GST and net of any input tax credits).
            </Text>
            <Text style={styles.descriptionP}>
              For more information on fees, see Section 5 of the
              {' '}
              <Text onPress={() => this.clickOnLink()} style={styles.descriptionUnderline}>
                PDS
              </Text>
              .
            </Text>
            <Text style={styles.descriptionP}>
              WITHDRAWALS
            </Text>
            <Text style={styles.descriptionP}>
              Because of the types of assets the Fund will invest in, it is likely that the Fund will be an “Illiquid” fund under the Corporation Act. Certain restrictions apply to withdrawals from Illiquid funds.
            </Text>
            <Text style={styles.descriptionP}>
              It is intended that while the Fund is Illiquid, a Withdrawal Offer will be made periodically, with the aim to make monthly Withdrawal Offers. However, this is not guaranteed. For more information about Withdrawal Offers, refer to Section 6 – Withdrawal of Units.
            </Text>
            <Text style={styles.descriptionP}>
              While the Fund is Illiquid, the Responsible Entity does not have an obligation to make Withdrawal Offers, and if it does so, it may not be able to satisfy part or all of your redemption request.
            </Text>
            <Text style={[styles.descriptionP, sg.mB20]}>
              For more information on Withdrawals, see Section 6 of the
              {' '}
              <Text onPress={() => this.clickOnLink()} style={styles.descriptionUnderline}>
                PDS
              </Text>
              .
            </Text>
          </View>
          <Button onPress={() => this.onNext()} block>
            <Text>Next</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(ImportantInfo);
