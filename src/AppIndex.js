
import React, { Component } from 'react';

import {
  BackHandler,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import amplitude from 'amplitude-js';


import {
  Root,
  Container,
  StyleProvider,
} from 'native-base';

import { isNil } from 'lodash';

import { clearThemeCache } from 'native-base-shoutem-theme';

import Toast from 'src/Components/Toast';
import BottomInfoModal from 'src/Components/BottomInfo';

import {
  getTheme,
  themeLight,
  themeDark,
} from 'src/Theme';

import {
  navGetParam,
} from 'src/Common/Helpers';

import moment from 'src/Common/moment';

import Api from 'src/Common/Api';
import ProtectedRoutes from 'src/Common/ProtectedRoutes';

import Spinner from 'src/Components/Spinner';
// import Spinner from 'react-native-loading-spinner-overlay';
import Alert from 'src/Components/Alert';
import { AppWithNavigationState } from 'src/Navigation/AppNavigator';
import { accountSelector } from 'src/Redux/Account/selectors';
import {
  themeSelector, setLightThemeAction, setDarkThemeAction, toggleThemeAction,
} from 'src/Redux/Theme';
import {
  navigateTo,
  routeBack,
} from 'src/Redux/Nav';
import { sc } from './Styles';

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
    this.setAnalyticsUser();
    this.initializeTheme();
  }

  setAnalyticsUser() {
    const { auth } = this.props;
    if (auth.user) {
      const { id } = auth.user;
      amplitude.getInstance().setUserId(id);
    }
  }

  getUserInfo = () => {
    const { auth } = this.props;
    return auth.user || {};
  }

  alert = (options) => {
    this.AlertComp.showDialog(options);
  }

  // THEMEING RELATED STUFF

  setDarkTheme = () => {
    const { setDarkThemeConnect } = this.props;
    setDarkThemeConnect();
    clearThemeCache();
  }

  setLightTheme = () => {
    const { setLightThemeConnect } = this.props;
    setLightThemeConnect();
    clearThemeCache();
  }

  toogleTheme = () => {
    const { toggleThemeConnect } = this.props;
    toggleThemeConnect();
    clearThemeCache();
  }

  enableTheme = () => {
    /* uncoment to make dark/light auto swiching on */
    const currentTime = moment();
    // console.log("currentTime: " + currentTime);
    const format = 'hh:mm A';
    if (currentTime.isBetween(moment('06:00 AM', format), moment('07:00 PM', format))) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
    this.setLightTheme();
  }

  disableTheme = () => {
    this.setLightTheme();
  }

  getTheme = () => {
    const { theme } = this.props;
    if (theme === 'dark') {
      return themeDark;
    }
    return themeLight;
  }

  isDarkTheme = () => {
    const { theme } = this.props;
    return theme === 'dark';
  }

  initializeTheme() {
    const { auth } = this.props;
    if (auth.user) {
      this.enableTheme();
    }
  }


  // /////////////////////////////////////////////////////////////


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

    if (!isNil(inp_back_screen)) {
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
    const { navigation, account, theme: themeMode } = this.props;
    let barStyle;
    let theme;
    if (themeMode === 'dark') {
      theme = themeDark;
      barStyle = 'light-content';
    } else {
      theme = themeLight;
      barStyle = 'dark-content';
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
      account,
      setDarkTheme: this.setDarkTheme,
      setLightTheme: this.setLightTheme,
      enableTheme: this.enableTheme,
      disableTheme: this.disableTheme,
      toogleTheme: this.toogleTheme,
      getTheme: this.getTheme,
      isDarkTheme: this.isDarkTheme,
      themeMode,
      Api,
    };

    return (
      <Root
        ref={(c) => {
          this._root = c;
        }}
      >
        <StyleProvider style={getTheme(theme)}>
          <Container>
            <StatusBar backgroundColor={theme.containerBgColor} barStyle={barStyle} />
            <Spinner
              ref={(c) => {
                this.Spinner = c;
              }}
              color="#11133D"
              textStyle={{ color: '#FFF' }}
              overlayColor={sc.color.containerBgColor}
              size={50}
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
              disableTheme={this.disableTheme}
            />
            <ProtectedRoutes
              navigateTo={this.navigateTo}
              account={account}
              navState={navigation}
            />
            <AppWithNavigationState
              navigation={screenProps}
            />
            <Toast
              ref={(c) => {
                if (c) Toast.toastInstance = c;
              }}
            />
            <BottomInfoModal screenProps={screenProps} theme={this.getTheme} />
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
  theme: PropTypes.string.isRequired,
  setLightThemeConnect: PropTypes.func.isRequired,
  setDarkThemeConnect: PropTypes.func.isRequired,
  toggleThemeConnect: PropTypes.func.isRequired,
};

function bindAction(dispatch) {
  return {
    navigateToConnect: (route, params) => dispatch(navigateTo(route, params)),
    routeBackConnect: (back_screen, params) => dispatch(routeBack(back_screen, params)),
    setDarkThemeConnect: () => dispatch(setDarkThemeAction()),
    setLightThemeConnect: () => dispatch(setLightThemeAction()),
    toggleThemeConnect: () => dispatch(toggleThemeAction()),
  };
}

const mapStateToProps = (state) => ({
  navigation: state.navigationCard,
  auth: state.auth,
  account: accountSelector(state),
  theme: themeSelector(state),
});

export default connect(mapStateToProps, bindAction)(AppIndex);
