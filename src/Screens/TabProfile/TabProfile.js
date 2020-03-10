import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
  Switch,
} from 'native-base';

import ImagePicker from 'react-native-image-picker';

import { routeNames } from 'src/Navigation';

import { userSelector } from 'src/Redux/AppContent';
import {
  userUpdateAvatar,
  userDenyPushNotifications,
} from 'src/Redux/Auth';

import PushNotificationService from 'src/Services/PushNotificationService';

import { sg } from 'src/Styles';

import styles from './styles';

const listMenuKeys = {
  PUSH_NOTIFICATIONS: 'PUSH_NOTIFICATIONS',
};

class TabProfile extends Component {
  constructor(props) {
    super(props);

    const { userAuth: { allowPushNotifications = false } } = props;

    this.state = {
      listMenu: [
        // {
        //   name: 'ID Check',
        //   screen: routeNames.ID_CHECK_FINISH,
        // },
        // {
        //   name: 'Change Theme',
        //   function: () => {
        //     props.screenProps.toogleTheme();
        //   },
        // },
        // {
        //   name: 'Manage accounts',
        //   screen: routeNames.MANAGE_ACCOUNTS,
        // },
        {
          name: 'Switch accounts',
          screen: routeNames.ACCOUNTS,
        },
        {
          key: listMenuKeys.PUSH_NOTIFICATIONS,
          name: 'Get Push Notifications',
          isSwitcher: true,
          isSwitcherActive: allowPushNotifications,
          function: () => {
            this.initPushNotifications();
          },
        },
        // {
        //   name: 'Personal details',
        //   screen: routeNames.PERSONAL_DETAILS,
        // },
        // {
        //   name: 'Refer a friend',
        //   screen: routeNames.REFER_FRIEND,
        // },
        {
          name: 'Talk to us',
          screen: routeNames.TALK_US,
        },
        // {
        //   name: 'Talk to us',
        //   function: () => this.displayIntercom(props),
        // },
        // {
        //   name: 'Withdraw',
        //   screen: routeNames.TAB_PROFILE,
        // },
        // {
        //   name: 'Join Future Super',
        //   screen: routeNames.JOIN_FUTURE_SUPER,
        // },
        // {
        //   name: 'Onboarding & Sign Up',
        //   screen: routeNames.SCREENS_LIST,
        // },
      ],
    };
  }

  componentDidUpdate(prevProps) {
    const { userAuth: { allowPushNotifications } } = this.props;
    const { userAuth: { allowPushNotifications: allowPushNotificationsPrev } } = prevProps;

    if (
      (allowPushNotifications !== allowPushNotificationsPrev)
    ) {
      this.updateListMenuSwitcher(listMenuKeys.PUSH_NOTIFICATIONS, allowPushNotifications);
    }
  }

  navigateTo = (screen) => {
    const { screenProps } = this.props;
    screenProps.navigateTo(screen);
  };

  logOut = () => {
    const { screenProps } = this.props;

    screenProps.disableTheme();
    screenProps.Api.logOut();
  };

  initPushNotifications() {
    const {
      userDenyPushNotificationsConnect,
      userAuth: { allowPushNotifications = false },
    } = this.props;

    if (allowPushNotifications) {
      userDenyPushNotificationsConnect();

      this.updateListMenuSwitcher(listMenuKeys.PUSH_NOTIFICATIONS, false);
    } else {
      PushNotificationService.init();
    }
  }

  updateListMenuSwitcher(keyUpdate, isSwitcherActive) {
    const { listMenu } = this.state;

    const listMenuNew = listMenu.map((itemInp) => {
      const item = itemInp;
      if (item.key === keyUpdate) {
        item.isSwitcherActive = isSwitcherActive;
      }

      return item;
    });

    this.setState({
      listMenu: listMenuNew,
    });
  }

  handleAvatarChange() {
    const { userUpdateAvatarConnect } = this.props;
    const options = {
      title: 'Select Image',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true,
        waitUntilSaved: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.uri;
        console.log('source!!!!', source);
        userUpdateAvatarConnect(source);
      }
    });
  }

  renderAvatar() {
    const { user } = this.props;
    let childEl;

    if (user.profileImage) {
      childEl = (
        <View>
          <Thumbnail source={{ uri: user.profileImage }} style={styles.profileImage} />
          {/*
          <View style={{
            position: 'absolute', top: 45, left: 40, backgroundColor: 'black', padding: 6, borderRadius: 45,
          }}
          >

            <Icon
              type="FontAwesome"
              name="camera"
              style={{
                fontSize: 14,
                color: 'white',
              }}
            />

          </View>
          */}
        </View>
      );
    } else {
      childEl = (
        <View style={styles.profileAvatarBl}>
          <Text style={styles.profileAvatarText}>
            {user.firstName ? user.firstName.charAt(0) : ''}
            {user.lastName ? user.lastName.charAt(0) : ''}
          </Text>

          {/*
          <View style={{
            position: 'absolute', top: 45, left: 40, backgroundColor: 'black', padding: 6, borderRadius: 45,
          }}
          >

            <Icon
              type="FontAwesome"
              name="camera"
              style={{
                fontSize: 14,
                color: 'white',
              }}
            />

          </View>
          */}
        </View>
      );
    }

    const res = (
      <TouchableOpacity onPress={() => this.handleAvatarChange()}>{childEl}</TouchableOpacity>
    );

    return res;
  }

  render() {
    const { user, screenProps } = this.props;
    const { themeMode } = screenProps;
    const { listMenu } = this.state;

    return (
      <Content contentContainerStyle={[sg.pB30]}>
        <Grid style={[sg.mT20]}>
          <Col style={sg.aICenter}>
            {this.renderAvatar()}

            <View style={[sg.row, sg.mT25, sg.mB15]}>
              {user.fullName ? (
                <H2 color2>{user.fullName}</H2>
              ) : (
                <View>
                  <H2 color2>
                    {user.firstName || ''}
                    &nbsp;
                  </H2>
                  <H2 color2>{user.lastName || ''}</H2>
                </View>
              )}
            </View>
            <View>
              <Text style={[sg.fS12]}>
                {`Member since ${user.memberSince}` }
              </Text>
            </View>
          </Col>
        </Grid>

        <View>
          <List style={sg.contentMarginLeft}>
            <ListItem style={[sg.pT15, sg.mL0]} />
            <FlatList
              data={listMenu}
              extraData={themeMode}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem
                  onPress={() => {
                    if (item.isSwitcher) {
                      return;
                    }

                    if (item.function) {
                      item.function();
                    } else {
                      this.navigateTo(item.screen);
                    }
                  }}
                  style={[sg.pT20, sg.pB20, sg.mL0, sg.pR30]}
                >
                  <Left>
                    <Text style={[sg.fontMedium]}>{item.name}</Text>
                  </Left>
                  <Right>
                    {item.isSwitcher ? (
                      <Switch
                        value={item.isSwitcherActive}
                        onValueChange={() => {
                          if (item.function) {
                            item.function();
                          }
                        }}
                      />
                    ) : (
                      <Icon name="ios-arrow-forward" />
                    )}
                  </Right>
                </ListItem>
              )}
            />
          </List>

          <Button bordered transparent dark3 style={styles.logOut} onPress={this.logOut} block>
            <Text>Log out</Text>
          </Button>
        </View>
      </Content>
    );
  }
}

TabProfile.propTypes = {
  user: PropTypes.object.isRequired,
  userAuth: PropTypes.object.isRequired,
  userUpdateAvatarConnect: PropTypes.func.isRequired,
  userDenyPushNotificationsConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const user = userSelector(state);

  return {
    user,
    userAuth: state.auth.user,
  };
};

const mapDispatchToProps = {
  userUpdateAvatarConnect: userUpdateAvatar,
  userDenyPushNotificationsConnect: userDenyPushNotifications,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabProfile);
