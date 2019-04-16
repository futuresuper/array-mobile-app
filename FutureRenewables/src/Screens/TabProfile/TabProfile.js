
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  FlatList,
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
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import {
  routeNames,
} from 'src/Navigation';

import styles from './styles';

class TabProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: 'Mel',
        secondName: 'Gibson',
        photo: 'http://www.gstatic.com/tv/thumb/persons/633/633_v9_bc.jpg',
      },
      listMenu: [
        {
          name: 'Manage accounts',
          screen: routeNames.MANAGE_ACCOUNTS,
        },
        {
          name: 'Personal details',
          screen: routeNames.PERSONAL_DETAILS,
        },
        {
          name: 'Refer a friend',
          screen: routeNames.REFER_FRIEND,
        },
        {
          name: 'Talk to us',
          screen: routeNames.TALK_US,
        },
        {
          name: 'Withdraw',
          screen: routeNames.TAB_PROFILE,
        },
        {
          name: 'Join Future Super',
          screen: routeNames.JOIN_FUTURE_SUPER,
        },
      ],
    };
  }

  navigateTo = (screen) => {
    const { screenProps } = this.props;
    screenProps.navigateTo(screen);
  }

  logOut = () => {
    console.log('!!!logout');
  }

  render() {
    const { user, listMenu } = this.state;

    return (
      <Content contentContainerStyle={sg.tabFooterPadding}>

        <Grid style={sg.m20}>
          <Col>
            <H2>{user.firstName}</H2>
            <H2 style={sg.mB10}>{user.secondName}</H2>
            <Text style={[sg.colorGray, sg.fS15]}>Member since July&apos;19</Text>
          </Col>
          <Col style={[sg.jCCenter, sg.aIRight]}>
            <Thumbnail source={{ uri: user.photo }} />
          </Col>
        </Grid>


        <View>
          <List>
            <ListItem />
            <FlatList
              data={listMenu}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem onPress={() => { this.navigateTo(item.screen); }}>
                  <Left>
                    <Text>{item.name}</Text>
                  </Left>
                  <Right>
                    <Icon name="ios-arrow-forward" style={styles.listIcon} />
                  </Right>
                </ListItem>
              )}
            />
          </List>

          <Button
            transparent
            bordered
            style={styles.logOut}
            onPress={this.logOut}
            large
            block
          >
            <Text style={styles.logOutText}>Log out</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

export default connect()(TabProfile);
