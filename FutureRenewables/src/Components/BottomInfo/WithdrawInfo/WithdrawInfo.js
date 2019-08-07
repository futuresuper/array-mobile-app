
import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  H2,
  Text,
  Button,
} from 'native-base';

import BottomInfo from 'src/Components/BottomInfo';

import {
  sg,
} from 'src/Styles';

const WithdrawInfo = () => (
  <View style={[sg.aICenter, sg.mH15]}>
    <H2 style={[sg.fS20, sg.colorDark2, sg.textCenter]}>
      How do withdrawals work?
    </H2>

    <Text style={[sg.fS12, sg.mT10, sg.colorDark3, sg.textCenter]}>
      We’re aiming to provide a monthly opportunity for investors to withdraw.
      If there is a withdrawal offer made,
      you will be able to request to withdraw by accepting the offer (which you can do in the Array app) by the time and closing date in the withdrawal offer.
      Approved redemption requests will be paid within 21 days of the closing date.
    </Text>

    <Button
      transparent
      bordered
      dark
      block
      style={[sg.mV20, sg.borderColorDark3]}
      onPress={() => {
        BottomInfo.hide();
      }}
    >
      <Text style={sg.colorDark3}>Okay got it</Text>
    </Button>

    <TouchableOpacity>
      <Text style={[sg.fS14, sg.textBold, sg.colorDark3]}>Get support</Text>
    </TouchableOpacity>

  </View>
);

export default WithdrawInfo;
