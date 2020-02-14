
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
          <H3 style={sg.fS14}>Requested</H3>
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0, sg.fS12]}>
            You’ve made a request to direct debit your bank account. This usually takes 2-4 days.
          </Text>
        </Body>
      </ListItem>

      <ListItem noIndent style={[sg.pL10, sg.pR0]}>
        <Left style={[sg.flex05, sg.aSTop]}>
          <BadgeCheckmark inverted />
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0, sg.fS12]}>Transaction is complete.</Text>
        </Body>
      </ListItem>

      <ListItem noIndent style={[sg.pL10, sg.pR0]}>
        <Left style={[sg.flex05, sg.aSTop]}>
          <H3 style={sg.fS14}>Cancelled</H3>
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0, sg.fS12]}>
            Your debit was cancelled.
          </Text>
        </Body>
      </ListItem>

      <ListItem noIndent style={[sg.pL10, sg.pR0]} noBorder>
        <Left style={[sg.flex05, sg.aSTop]}>
          <H3 style={sg.fS14}>Failed</H3>
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0, sg.fS12]}>
            We weren’t able to successfully debit your bank account.
          </Text>
        </Body>
      </ListItem>

    </List>
  </View>
);

export default StatusInfo;
