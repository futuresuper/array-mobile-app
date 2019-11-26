
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  H2,
  Grid,
  Row,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

class BalanceInfo extends Component {
  renderInfoRow(textLeft, textRight) {
    return (
      <Row>
        <Text style={styles.textBold}>
          {`${textLeft}:`}
          &nbsp;
        </Text>
        <Text style={styles.text}>{textRight}</Text>
      </Row>
    );
  }

  render() {
    return (
      <View style={sg.mH5}>
        <H2 style={[sg.fS20, sg.colorDark2textCenter, sg.mL5]}>
          About your balance
        </H2>

        <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            activeOpacity={1}
          >
            <Text style={[styles.text, sg.mT15]}>
              This number show your&nbsp;
              <Text style={[styles.textBold]}>Account Balance</Text>
              &nbsp;plus any&nbsp;
              <Text style={[styles.textBold]}>Pending Transactions</Text>
              &nbsp;for your currently selected account in the Future Renewables Fund.
            </Text>

            {/*
            <Grid style={sg.mT15}>
              {this.renderInfoRow('Account', 'Grace Palos - 10001-FRF-001')}
              {this.renderInfoRow('Unit Balance', '1,000')}
              {this.renderInfoRow('Unit Price', '1.078 at 31 May 2019')}
              {this.renderInfoRow('Account Balance', '$1,078')}
              {this.renderInfoRow('Pending Transactions', '$200')}
            </Grid>
            */}

            <Text style={[styles.text, sg.mT15]}>
              Pending Transactions are your application monies that have been received by us,
              where that application hasn’t yet been processed, and converted into units in the Fund.
            </Text>

            <Text style={[styles.text, sg.mT15]}>
              While every effort is made to ensure that the information in your member portal is correct,
              you should consider obtaining advice before acting on any of the information contained within and seek updated information where relevant.
              We reserve the right to correct any error or omission.
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default BalanceInfo;
