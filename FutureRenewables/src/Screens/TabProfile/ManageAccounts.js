
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  Button,
  Content,
  Text,
  Icon,
  H2,
  Left,
  Right,
  Thumbnail,
  Grid,
  Col,
  List,
  ListItem,
  Body,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import BottomInfo from 'src/Components/BottomInfo';

import {
  sg,
} from 'src/Styles';


import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class ManageAccounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [
        {
          name: 'Grace',
          balance: '$12,091.00',
          complete: true,
        },
        {
          name: 'Grang of Youths',
          balance: '$12,091.00',
          complete: true,
        },
        {
          name: 'Grace',
          balance: '',
          complete: false,
        },
      ],
    };
  }

  openItem(item) {
    const { screenProps } = this.props;
    screenProps.navigateTo(routeNames.MANAGE_ACCOUNT_DETAILS);
  }

  renderItem = ({ item }) => (
    <ListItem
      button
      onPress={() => {
        this.openItem(item);
      }}
    >
      <Body>
        <Text style={[sg.mL0, sg.mB10, sg.fS22]}>{item.name}</Text>

        <Text style={[sg.mL0, sg.fS14]}>
          Balance:&nbsp;
          <Text>{item.balance}</Text>
        </Text>
      </Body>
      <Right>
        <Icon name="ios-arrow-forward" style={sg.mB10} />
        {!item.complete &&
          <Text style={[sg.fS14]}>Resume</Text>
        }
      </Right>
    </ListItem>
  )

  render() {
    const { accounts } = this.state;

    return (
      <Content>
        <List>
          <ListItem />

          <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
            <Text style={[sg.fS14]}>Incomplete application</Text>
          </View>

          <FlatList
            data={accounts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />

        </List>

        <TouchableOpacity
          style={sg.whatIsAccountBl}
          onPress={() => {
            BottomInfo.showFutureSuperAccount();
          }}
        >
          <Text style={sg.whatIsAccount}>What&apos;s a future super Account?</Text>
        </TouchableOpacity>
      </Content>
    );
  }
}

export default connect()(ManageAccounts);

