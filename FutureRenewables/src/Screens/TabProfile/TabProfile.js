
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  FlatList,
  Image,
} from 'react-native';

import {
  Button,
  Content,
  Text,
  Icon,
  H1,
  H3,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Grid,
  Col,
  Row,
  Badge,
  List,
  ListItem,
} from 'native-base';

import {
  sg,
} from 'src/Styles';

import {
  routeNames,
} from 'src/Navigation';

import IconStat from 'src/Components/IconStat';

import styles from './styles';

class TabProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: 'Mel Gibson',
        photo: 'http://www.gstatic.com/tv/thumb/persons/633/633_v9_bc.jpg',
      },
      listMenu: [
        {
          name: 'Manage accounts',
          screen: routeNames.TAB_HOME,
        },
        {
          name: 'Personal details',
          screen: routeNames.TAB_HOME,
        },
        {
          name: 'Refer a friend',
          screen: routeNames.TAB_HOME,
        },
        {
          name: 'Support',
          screen: routeNames.TAB_HOME,
        },
        {
          name: 'Withdraw',
          screen: routeNames.TAB_HOME,
        },
        {
          name: 'Future Super',
          screen: routeNames.TAB_HOME,
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
        <View style={sg.center}>
          <Thumbnail source={{ uri: user.photo }} large />
          <H1 style={sg.mT10}>{user.name}</H1>

        </View>


        <View>
          <List>
            <ListItem />
            <ListItem>
              <Body style={styles.statBl}>

                <Text style={styles.textSinceJoining}>Since joining, your investment has helped</Text>
                <Grid>
                  <Col style={styles.iconStatBl}>
                    <IconStat
                      value="2"
                      description="Solar farms, to be built"
                      icon={{
                        type: 'FontAwesome5',
                        name: 'solar-panel',
                      }}
                    />

                    <IconStat
                      value="12k"
                      description="Homes to be powered"
                      icon={{
                        type: 'AntDesign',
                        name: 'home',
                      }}
                    />

                    <IconStat
                      value="50t"
                      description="Of carbon to be removed"
                      icon={{
                        type: 'Entypo',
                        name: 'tree',
                      }}
                    />
                  </Col>
                </Grid>

              </Body>
            </ListItem>
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
          >
            <Text style={styles.logOutText}>Log out</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

export default connect()(TabProfile);
