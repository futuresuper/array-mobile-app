
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
          <H3>Upcoming</H3>
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0]}>A future investment setup with a regular deposit</Text>
        </Body>
      </ListItem>

      <ListItem noIndent style={[sg.pL10, sg.pR0]}>
        <Left style={[sg.flex05, sg.aSTop]}>
          <H3>Pending</H3>
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0]}>A future investment setup with a regular deposit</Text>
        </Body>
      </ListItem>

      <ListItem noIndent style={[sg.pL10, sg.pR0]} noBorder>
        <Left style={[sg.flex05, sg.aSTop]}>
          <H3 style={sg.mR10}>Recieved</H3>
          <BadgeCheckmark />
        </Left>
        <Body style={sg.mL20}>
          <Text style={[sg.colorGray7, sg.mR0]}>A future investment setup with a regular deposit</Text>
        </Body>
      </ListItem>

    </List>
  </View>
);

export default StatusInfo;
