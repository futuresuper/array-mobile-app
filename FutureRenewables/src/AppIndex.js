
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

  setDarkTheme = () => {
    ThemeService.setDark();
    this.setState({
      dark: true,
    }, () => {
      clearThemeCache();
      this.forceUpdate();
    });
  }

  setLightTheme = () => {
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

  getTheme = () => ThemeService.getTheme()

  render() {
    const { dark } = this.state;
    const barStyle = dark ? 'light-content' : 'dark-content';
    let theme;

    if (dark) {
      theme = themeDark;
    } else {
      theme = themeLight;
    }
    // console.log('!!!theme', getTheme(theme));

    return (
      <Root
        ref={(c) => {
          this._root = c;
        }}
      >
        <StyleProvider style={getTheme(theme)}>
          <Container>
            <StatusBar backgroundColor="transparent" barStyle={barStyle} translucent />

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
                setDarkTheme: this.setDarkTheme,
                setLightTheme: this.setLightTheme,
                toogleTheme: this.toogleTheme,
                getTheme: this.getTheme,
                Api,
                theme: {
                  dark,
                },
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
