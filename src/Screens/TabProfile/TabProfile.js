import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View, FlatList, TouchableOpacity, Alert,
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

import Intercom from 'react-native-intercom';
import ImagePicker from 'react-native-image-picker';

import { routeNames } from 'src/Navigation';

import moment from 'src/Common/moment';

import { userSelector } from 'src/Redux/AppContent';

import { userUpdateAvatar } from 'src/Redux/Auth';

import Camera from 'src/Components/Camera';
import { sg } from 'src/Styles';
import ImageUploadModal from './ImageUploadModal';


import styles from './styles';

class TabProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraVisible: false,
      filePath: {},
      imageUploadModalIsVisible: false,
      listMenu: [
        // {
        //   name: 'ID Check',
        //   screen: routeNames.ID_CHECK_FINISH,
        // },
        {
          name: 'Change Theme',
          function: () => {
            props.screenProps.toogleTheme();
          },
        },
        // {
        //   name: 'Allow Push Notifications',
        //   function: () => {
        //     Alert.alert(
        //       'Subscribe to Push Notifications',
        //       'Subscribe to recieve Push Notifications in the future.',
        //       [
        //         { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
        //         { text: 'Subscribe', onPress: () => console.log('Subscribe Pressed') },
        //       ],
        //       { cancelable: false },
        //     );
        //   },
        // },
        // {
        //   name: 'Manage accounts',
        //   screen: routeNames.MANAGE_ACCOUNTS,
        // },
        // {
        //   name: 'Personal details',
        //   screen: routeNames.PERSONAL_DETAILS,
        // },
        // {
        //   name: 'Refer a friend',
        //   screen: routeNames.REFER_FRIEND,
        // },
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

  componentDidMount() {
    const { user } = this.props;

    if (user.email) {
      Intercom.registerIdentifiedUser({ email: user.email });
    }
  }

  onTakePhoto = (data) => {
    const { userUpdateAvatarConnect } = this.props;
    const { uri } = data;
    console.log('----------data from camera', data);
    userUpdateAvatarConnect(uri);
    this.toggleCamera();
    this.toggleImageUploadModal();
  };

  navigateTo = (screen) => {
    const { screenProps } = this.props;
    screenProps.navigateTo(screen);
  };

  logOut = () => {
    const { screenProps } = this.props;

    screenProps.disableTheme();
    screenProps.Api.logOut();
  };

  toggleCamera = () => {
    this.setState((prev) => ({
      imageUploadModalIsVisible: !prev.imageUploadModalIsVisible,
      cameraVisible: !prev.cameraVisible,
    }));
  };

  toggleImageUploadModal = () => {
    this.setState((prev) => ({
      imageUploadModalIsVisible: !prev.imageUploadModalIsVisible,
    }));
  };

  chooseFile = () => {
    const { userUpdateAvatarConnect } = this.props;
    const options = {
      title: 'Select Image',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        alert('Please try one more time!');
      } else {
        const source = response.uri;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
          imageUploadModalIsVisible: false,
        });
        console.log('----------data from library', source);

        userUpdateAvatarConnect(source);
      }
    });
  };

  displayIntercom(props) {
    const { user, screenProps } = props;
    Intercom.registerUnidentifiedUser();
    if (user.email) {
      Intercom.displayMessageComposer();
    } else {
      screenProps.toast("You don't have email to talk to us");
    }
  }

  renderAvatar() {
    const { user } = this.props;
    let childEl;

    if (user.profileImage) {
      childEl = <Thumbnail source={{ uri: user.profileImage }} style={styles.profileImage} />;
    } else {
      childEl = (
        <View style={styles.profileAvatarBl}>
          <Text style={styles.profileAvatarText}>
            {user.firstName ? user.firstName.charAt(0) : ''}
            {user.lastName ? user.lastName.charAt(0) : ''}
          </Text>
        </View>
      );
    }

    const res = (
      <TouchableOpacity onPress={this.toggleImageUploadModal}>{childEl}</TouchableOpacity>
    );

    return res;
  }

  render() {
    const { user, screenProps } = this.props;
    const { listMenu, cameraVisible, imageUploadModalIsVisible } = this.state;

    if (!user.dateJoined) {
      user.dateJoined = '2019-03-15';
    }
    const theme = screenProps.getTheme();
    const memberSince = `${moment(user.dateJoined).format('MMMM')}'s ${user.dateJoined
      .split('-')[0]
      .substring(2)}`;

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

            {/*
            <Text style={[sg.colorGray11, sg.fS14]}>
              {`Member since ${memberSince
              || '2019-03-15'}`}

            </Text>
            */}
          </Col>
        </Grid>

        <View>
          <List style={sg.contentMarginLeft}>
            <ListItem style={[sg.pT15, sg.mL0]} />

            <FlatList
              data={listMenu}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ListItem
                  onPress={() => {
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
                    <Icon name="ios-arrow-forward" />
                  </Right>
                </ListItem>
              )}
            />
          </List>

          <Button bordered transparent dark3 style={styles.logOut} onPress={this.logOut} block>
            <Text>Log out</Text>
          </Button>
        </View>
        <Camera
          visible={cameraVisible}
          onRequestClose={this.toggleCamera}
          onTakePhoto={this.onTakePhoto}
        />
        <ImageUploadModal
          theme={theme}
          visible={imageUploadModalIsVisible}
          toggleCamera={this.toggleCamera}
          toggleLibrary={this.chooseFile}
          onRequestClose={() => {
            this.setState({
              imageUploadModalIsVisible: false,
            });
          }}
        />
      </Content>
    );
  }
}

TabProfile.propTypes = {
  user: PropTypes.object.isRequired,
  userUpdateAvatarConnect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const user = userSelector(state);

  return {
    // user: state.auth.user,
    user,
  };
};

const mapDispatchToProps = {
  userUpdateAvatarConnect: userUpdateAvatar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabProfile);
