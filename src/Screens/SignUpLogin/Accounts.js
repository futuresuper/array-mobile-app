import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';

// import PushNotification from 'react-native-push-notification';

import {
  Button,
  Content,
  Text,
} from 'native-base';

import { routeNames } from 'src/Navigation';
import { userDataSave } from 'src/Redux/Auth';
import { appContentSave, userSelector } from 'src/Redux/AppContent';
import { accountSelectSave } from 'src/Redux/Account';
import SafeAreaView from 'src/Components/SafeAreaView';
import AccountsList from 'src/Components/AccountsList';

import { sg } from 'src/Styles';

class Accounts extends React.Component {
  componentDidMount() {
    const { userDataSaveConnect, appContentSaveConnect, screenProps } = this.props;

    this.getAppContent((appContent) => {
      const { user } = appContent;
      userDataSaveConnect(user);
      appContentSaveConnect(appContent);
      screenProps.spinnerHide();
    });

    // screenProps.navigateTo(routeNames.ID_CHECK_ONLINE);
  }

  onAccountSelect(account) {
    const { accountSelectSaveConnect, screenProps } = this.props;
    // Route is changed in ProtectedRoutes (src/Common/ProtectedRoutes.js)
    accountSelectSaveConnect(account);
    screenProps.navigateTo(routeNames.TAB_HOME);
  }


  getAppContent(callback) {
    const { screenProps } = this.props;
    screenProps.Api.get('/appcontent', {}, callback, () => {
      screenProps.navigateTo(routeNames.APP_LANDING);
    });
  }

  render() {
    const { screenProps, user } = this.props;

    return (
      <SafeAreaView themeMode={screenProps.themeMode} forceInset={{ top: 'never' }}>
        <Content padder contentContainerStyle={sg.flexGrow}>
          <View style={sg.spaceBetween}>
            <View>
              <View>
                <Text style={[sg.formHeading]}>Your accounts</Text>
              </View>
              <AccountsList
                onItemPress={(account) => this.onAccountSelect(account)}
              />
            </View>
            <View>
              <Button
                onPress={() => {
                  screenProps.navigateTo(routeNames.ABOUT_APP_FORM);
                }}
                block
              >
                <Text>Start new application</Text>
              </Button>
              { !user.personalDetailsLocked // exclude users that have already submitted an application
              && (
                <Button
                  onPress={() => {
                    screenProps.navigateTo(routeNames.TAB_HOME);
                  }}
                  bordered
                  dark
                  block
                  marginVert
                >
                  <Text>Explore Array</Text>
                </Button>
              )}
            </View>
          </View>
        </Content>
      </SafeAreaView>
    );
  }
}

Accounts.propTypes = {
  userDataSaveConnect: PropTypes.func.isRequired,
  appContentSaveConnect: PropTypes.func.isRequired,
  accountSelectSaveConnect: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const user = userSelector(state);

  return {
    user,
  };
};

const mapDispatchToProps = {
  userDataSaveConnect: userDataSave,
  appContentSaveConnect: appContentSave,
  accountSelectSaveConnect: accountSelectSave,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Accounts);
