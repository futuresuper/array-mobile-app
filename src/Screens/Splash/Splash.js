
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  View,
  Text,
} from 'react-native';

import {
  routeNames,
} from 'src/Navigation';

class Splash extends Component {
  componentDidMount() {
    this.proc();
  }


  proc() {
    const { screenProps } = this.props;
    const {
      navigateTo, getUserInfo,
    } = screenProps;

    const userInfo = getUserInfo();
    const isAuth = (userInfo && !isEmpty(userInfo));

    if (isAuth && userInfo.email && userInfo.firstName && userInfo.lastName) {
      navigateTo(routeNames.ACCOUNTS);
    } else {
      navigateTo(routeNames.APP_LANDING);
    }
  }

  renderOnDev() {
    if (!__DEV__) {
      return null;
    }

    return (
      <View style={{ position: 'absolute', overflow: 'hidden' }}>
        {[...Array(15).keys()].map((item) => <Text key={item} style={{ position: 'absolute' }}>{item}</Text>)}
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderOnDev()}
      </View>
    );
  }
}

export default connect()(Splash);
