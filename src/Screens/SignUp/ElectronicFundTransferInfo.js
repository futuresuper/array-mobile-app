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
} from 'native-base';
import { composeHoc, hocNames } from 'src/Common/Hocs';

import { routeNames } from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

class ElectronicFundTransferInfo extends React.PureComponent {
  handleNext() {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.BANK_ACCOUNT);
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View>
            <View style={[sg.left]}>
              <Text style={sg.formHeading}>
                {'Depositing your investment amount'}
              </Text>
              <Text>
                {'For investments of that size, the only payment option currently available is Electronic Funds Transfer (EFT).\n\n'}
                {'We’ll provide the bank details for your payment at the end of your application.\n\n'}
                {'We’ll still collect your bank details on the next page, in case you wish to withdraw in future, and so that you can easily make additional investments of up to $5,000 by direct debit.'}
              </Text>
            </View>
          </View>
          <View>
            <Button onPress={() => this.handleNext()} block marginVert>
              <Text>Got it</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

const res = composeHoc([
  hocNames.FORM,
])(ElectronicFundTransferInfo);


export default connect()(res);
