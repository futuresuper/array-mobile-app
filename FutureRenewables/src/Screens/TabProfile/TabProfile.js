
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  routeNames,
} from 'src/Navigation';

import moment from 'src/Common/moment';

import {
  sg,
} from 'src/Styles';

import styles from './styles';

class TabProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        {
          name: 'Onboarding & Sign Up',
          screen: routeNames.SCREENS_LIST,
        },
      ],
    };
  }

  navigateTo = (screen) => {
    const { screenProps } = this.props;
    screenProps.navigateTo(screen);
  }

  logOut = () => {
    const { screenProps } = this.props;
    screenProps.Api.logOut();
  }

  render() {
    const { user, screenProps } = this.props;
    const { listMenu } = this.state;

    const memberSince = `${moment(user.dataJoined).format('MMMM')}'s ${user.dateJoined.split('-')[0].substring(2)}`;

    return (
      <Content contentContainerStyle={[sg.pB30]}>

        <Grid style={[sg.mT20]}>
          <Col style={sg.aICenter}>
            <Thumbnail source={{ uri: user.profileImage }} style={styles.profileImage} />

            <View style={[sg.row, sg.mT25, sg.mB15]}>
              <H2 color2>
                {user.firstName}
                &nbsp;
              </H2>
              <H2 color2>{user.lastName}</H2>
            </View>

            <Text style={[sg.colorGray11, sg.fS14]}>{`Member since ${memberSince}`}</Text>
          </Col>
        </Grid>


        <View>
          <List style={sg.contentMarginLeft}>
            <ListItem style={[sg.pT15, sg.mL0]} />

            <ListItem
              onPress={() => {
                screenProps.toogleTheme();
              }}
              style={[sg.pT20, sg.pB20, sg.mL0, sg.pR30]}
            >
              <Left>
                <Text style={[sg.fontMedium]}>Switch theme</Text>
              </Left>
              <Right>
                <Icon name="ios-arrow-forward" />
              </Right>
            </ListItem>

            <FlatList
              extraData={screenProps.theme}
              data={listMenu}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem onPress={() => { this.navigateTo(item.screen); }} style={[sg.pT20, sg.pB20, sg.mL0, sg.pR30]}>
                  <Left>
                    <Text style={[sg.fontMedium]}>{item.name}</Text>
                  </Left>
                  <Right>
                    <Icon name="ios-arrow-forward" />
                  </Right>
                </ListItem>
              )}
            />
          </List>

          <Button
            bordered
            transparent
            dark3
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

TabProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(TabProfile);
