
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  componentDidUpdate(prevProps) {
    const { hydrated } = this.props;
    const { hydrated: hydratedPrevious } = prevProps;
    console.log(hydrated);
    // if (hydrated !== hydratedPrevious) {
    this.proc();
    // }
  }

  proc() {
    const { screenProps } = this.props;
    const {
      navigateTo, hydrated, getUserInfo, accountInfo,
    } = screenProps;

    if (!hydrated) {
      return;
    }

    const userInfo = getUserInfo();
    const isAuth = (userInfo && !isEmpty(userInfo));
    const hasSelectedAccount = !isEmpty(accountInfo());

    if (isAuth) {
      console.log(hasSelectedAccount);
      // navigateTo(routeNames.TAB_HOME);
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
        {[...Array(15).keys()].map(item => <Text key={item} style={{ position: 'absolute' }}>{item}</Text>)}
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

Splash.propTypes = {
  hydrated: PropTypes.bool.isRequired,
};


export default connect()(Splash);
