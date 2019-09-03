
import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Content,
  Button,
  Text,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';
import signUpLoginUtils from 'src/Common/signUpLogin';

import {
  sg,
} from 'src/Styles';

class Notifications extends React.Component {
  notificationsYes() {
    Alert.alert(
      'Push Notifications',
      'Are you sure?',
      [
        {
          text: 'Yes',
          onPress: () => {
            this.nextScreen();
          },
        },
        {
          text: 'No',
        },
      ],
    );
  }

  nextScreen() {
    const { screenProps, accountType } = this.props;

    screenProps.navigateTo(routeNames.THANKS_SHARE, { accountType });
  }

  render() {
    return (
      <Content padder contentContainerStyle={sg.flexGrow}>
        <View style={sg.spaceBetween}>
          <View>
            <Text style={sg.formHeading}>
              Notifications
            </Text>

            <Text>
              We’ll let you know as soon as you have access to Array. Switch on notifications so you’ll know straight away.
            </Text>
          </View>

          <View>
            <Button
              onPress={() => this.notificationsYes()}
              block
              style={sg.mB20}
            >
              <Text>Turn on notifications</Text>
            </Button>
            <Button
              onPress={() => this.nextScreen()}
              bordered
              dark
              block
            >
              <Text>Continue without notifications</Text>
            </Button>
          </View>
        </View>
      </Content>
    );
  }
}

Notifications.propTypes = {
  accountType: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const { accountType } = signUpLoginUtils.getAccountType(ownProps.navigation);

  return {
    accountType,
  };
};

export default connect(mapStateToProps)(Notifications);
