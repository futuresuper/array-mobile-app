
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

import { clearThemeCache } from 'native-base-shoutem-theme';

import Toast from 'src/Components/Toast';
import BottomInfoModal from 'src/Components/BottomInfo';
import ThemeService from 'src/Services/ThemeService';

import {
  getTheme,
  themeLight,
  themeDark,
} from 'src/Theme';

import {
  navGetParam,
  getTimeLapse,
} from 'src/Common/Helpers';

import Api from 'src/Common/Api';
import Spinner from 'src/Components/Spinner';
import Alert from 'src/Components/Alert';
import { AppWithNavigationState } from 'src/Navigation/AppNavigator';
import { accountSelector } from 'src/Redux/Account/selectors';
import {
  navigateTo,
  routeBack,
} from 'src/Redux/Nav';

class AppIndex extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dark: false,
    };

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

  getUserInfo = () => {
    const { auth } = this.props;
    return auth.user || {};
  }

  getAccountInfo = () => {
    const { account } = this.props;
    return account;
  }

  alert = (options) => {
    this.AlertComp.showDialog(options);
  }

  setDarkTheme = () => {
    const { dark } = this.state;
    if (dark) {
      return;
    }

    ThemeService.setDark();
    this.setState({
      dark: true,
    }, () => {
      clearThemeCache();
      this.forceUpdate();
    });
  }

  setLightTheme = () => {
    const { dark } = this.state;
    if (!dark) {
      return;
    }

    ThemeService.setLight();
    this.setState({
      dark: false,
    }, () => {
      clearThemeCache();
      this.forceUpdate();
    });
  }

  toogleTheme = () => {
    const { dark } = this.state;

    if (dark) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  enableTheme = (currentTime) => {
    const timeLapse = getTimeLapse(currentTime);

    if (timeLapse.isSunrise || timeLapse.isDay) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  disableTheme = () => {
    this.setLightTheme();
  }

  getTheme = () => ThemeService.getTheme()
  isDarkTheme = () => ThemeService.isDark()

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

  toast(text, configInp = {}) {
    const config = {
      type: 'default',
      ...configInp,
    };

    Toast.show(text, {
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

  toastSuccess(text) {
    this.toast(text, {
      type: 'success',
    });
  }

  render() {
    const { navigation } = this.props;
    const { dark } = this.state;
    const barStyle = dark ? 'light-content' : 'dark-content';
    let theme;

    if (dark) {
      theme = themeDark;
    } else {
      theme = themeLight;
    }

    const screenProps = {
      navState: navigation,
      toast: this.toast,
      toastDanger: this.toastDanger,
      toastSuccess: this.toastSuccess,
      routeBack: this.routeBack,
      navigateTo: this.navigateTo,
      spinnerShow: this.spinnerShow,
      spinnerHide: this.spinnerHide,
      alert: this.alert,
      getUserInfo: this.getUserInfo,
      accountInfo: this.getAccountInfo,
      setDarkTheme: this.setDarkTheme,
      setLightTheme: this.setLightTheme,
      enableTheme: this.enableTheme,
      disableTheme: this.disableTheme,
      toogleTheme: this.toogleTheme,
      getTheme: this.getTheme,
      isDarkTheme: this.isDarkTheme,
      Api,
      theme: {
        dark,
      },
    };

    return (
      <Root
        ref={(c) => {
          this._root = c;
        }}
      >
        <StyleProvider style={getTheme(theme)}>
          <Container>
            <StatusBar backgroundColor={theme.containerBgColor} barStyle={barStyle} translucent />
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
              toastSuccess={this.toastSuccess}
            />
            <AppWithNavigationState
              navigation={screenProps}
            />
            <Toast
              ref={(c) => {
                if (c) Toast.toastInstance = c;
              }}
            />
            <BottomInfoModal screenProps={screenProps} />
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
  account: PropTypes.object.isRequired,
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
  account: accountSelector(state.account),
});

export default connect(mapStateToProps, bindAction)(AppIndex);
