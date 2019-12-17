
import React from 'react';
import {
  View,
} from 'react-native';
import {
  H2,
  H3,
  Text,
  List,
  ListItem,
  Left,
  Body,
} from 'native-base';

import BadgeCheckmark from 'src/Components/BadgeCheckmark';

import {
  sg,
} from 'src/Styles';

const StatusInfo = () => (
  <View>

    <List>
      <ListItem noIndent style={[sg.pL10, sg.pR10]}>
        <Left>
          <H2>
            Status Info
          </H2>
        </Left>
      </ListItem>

      <ListItem noIndent style={[sg.pL10, sg.pR0]}>
        <Left style={[sg.flex05, sg.aSTop]}>
          <H3 style={sg.fS14}>Upcoming</H3>
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0, sg.fS12]}>
            Will be debited from your bank account
          </Text>
        </Body>
      </ListItem>

      <ListItem noIndent style={[sg.pL10, sg.pR0]}>
        <Left style={[sg.flex05, sg.aSTop]}>
          <H3 style={sg.fS14}>Pending</H3>
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0, sg.fS12]}>
          We’ve received the amount, and it will be used to buy ‘units’ in the fund following end of the month.
          </Text>
        </Body>
      </ListItem>

      <ListItem noIndent style={[sg.pL10, sg.pR0]} noBorder>
        <Left style={[sg.flex05, sg.aSTop]}>
          <H3 style={[sg.mR10, sg.fS14]}>Requested</H3>
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0, sg.fS12]}>You’ve made a withdrawal request</Text>
        </Body>
      </ListItem>

      <ListItem noIndent style={[sg.pL10, sg.pR0]} noBorder>
        <Left style={[sg.flex05, sg.aSTop]}>
          <H3 style={[sg.mR10, sg.fS14]}>Processed</H3>
          <BadgeCheckmark inverted />
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0, sg.fS12]}>Transaction is complete</Text>
        </Body>
      </ListItem>

    </List>
  </View>
);

export default StatusInfo;
