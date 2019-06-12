
import React, { Component } from 'react';

import {
  BackHandler,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Root,
  Container,
  StyleProvider,
} from 'native-base';

import _ from 'lodash';

import Toast from 'src/Components/Toast';
import BottomInfoModal from 'src/Components/BottomInfo';

import getTheme from 'src/native-base-theme/components';
import material from 'src/native-base-theme/variables/material';

import {
  navGetParam,
} from 'src/Common/Helpers';

import Api from 'src/Common/Api';
import Spinner from 'src/Components/Spinner';
import Alert from 'src/Components/Alert';
import { AppWithNavigationState } from 'src/Navigation/AppNavigator';
import {
  navigateTo,
  routeBack,
} from 'src/Redux/Nav';

import {
  sc,
} from 'src/Styles';

class AppIndex extends Component {
  constructor(props, context) {
    super(props, context);

    this.routeBack = this.routeBack.bind(this);
    this.navigateTo = this.navigateTo.bind(this);
    this.spinnerShow = this.spinnerShow.bind(this);
    this.spinnerHide = this.spinnerHide.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.routeBack();

      return true;
    });
  }

  userInfo = () => {
    const { auth } = this.props;
    return auth.user || {};
  }

  alert = (options) => {
    this.AlertComp.showDialog(options);
  }

  // eslint-disable-next-line class-methods-use-this
  toast(text, configInp = {}) {
    const config = {
      type: 'default',
      ...configInp,
    };

    Toast.show({
      text,
      position: 'top',
      duration: 3000,
      ...config,
    });
  }

  toastDanger(text) {
    this.toast(text, {
      type: 'danger',
    });
  }

  navigateTo(route_name, params = {}) {
    const { navigateToConnect } = this.props;
    navigateToConnect(route_name, params);
  }

  spinnerShow(config) {
    this.Spinner.show(config);
  }

  spinnerHide() {
    this.Spinner.hide();
  }

  routeBack(inp_back_screen = null, inp_params = null) {
    const { navigation, routeBackConnect } = this.props;
    let back_screen;

    if (!_.isNil(inp_back_screen)) {
      back_screen = inp_back_screen;
    } else {
      back_screen = navGetParam(navigation, 'back_screen');
    }

    routeBackConnect(back_screen, inp_params);
  }

  render() {
    return (
      <Root
        ref={(c) => {
          this._root = c;
        }}
      >
        <StyleProvider style={getTheme(material)}>
          <Container>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

            <Spinner
              ref={(c) => {
                this.Spinner = c;
              }}
              textStyle={{ color: '#FFF' }}
              overlayColor="rgba(0,0,0,0.5)"
              size="large"
            />

            <Alert
              ref={(c) => {
                this.AlertComp = c;
              }}
            />

            <Api
              setRef={(c) => {
                if (c) Api.ApiInstance = c;
              }}
              spinnerShow={this.spinnerShow}
              spinnerHide={this.spinnerHide}
              navigateTo={this.navigateTo}
              toast={this.toast}
              toastDanger={this.toastDanger}
            />

            <AppWithNavigationState
              navigation={{
                toast: this.toast,
                toastDanger: this.toastDanger,
                routeBack: this.routeBack,
                navigateTo: this.navigateTo,
                spinnerShow: this.spinnerShow,
                spinnerHide: this.spinnerHide,
                alert: this.alert,
                userInfo: this.userInfo,
                Api,
              }}
            />

            <Toast
              ref={(c) => {
                if (c) Toast.toastInstance = c;
              }}
            />

            <BottomInfoModal />
          </Container>

        </StyleProvider>
      </Root>
    );
  }
}

AppIndex.propTypes = {
  navigateToConnect: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    key: PropTypes.string,
    routes: PropTypes.array,
  }).isRequired,
  routeBackConnect: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

function bindAction(dispatch) {
  return {
    navigateToConnect: (route, params) => dispatch(navigateTo(route, params)),
    routeBackConnect: (back_screen, params) => dispatch(routeBack(back_screen, params)),
  };
}

const mapStateToProps = state => ({
  navigation: state.navigationCard,
  auth: state.auth,
});

export default connect(mapStateToProps, bindAction)(AppIndex);
