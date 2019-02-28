
import React, { Component } from 'react';

import {
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Root,
  Container,
  StyleProvider,
  Toast,
} from 'native-base';

import _ from 'lodash';

import getTheme from 'src/native-base-theme/components';
import material from 'src/native-base-theme/variables/material';

import {
  navGetParam,
} from 'src/Common/Helpers';

import Api from 'src/Common/Api';
import Spinner from 'src/Components/Spinner';
import { AppWithNavigationState } from 'src/Navigation/AppNavigator';
import navigateTo from 'src/Redux/actions/sideBarNav';
import { routeBack } from 'src/Redux/actions/navigationCard';

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

  spinnerShow(config) {
    this.Spinner.show(config);
  }

  spinnerHide() {
    this.Spinner.hide();
  }

  navigateTo(route_name, params = {}) {
    const { navigateToConnect } = this.props;
    navigateToConnect(route_name, params);
  }

  // eslint-disable-next-line class-methods-use-this
  toast(text, type = 'default') {
    Toast.show({
      text,
      position: 'top',
      duration: 3000,
      type,
    });
  }

  toastDanger(text) {
    this.toast(text, 'danger');
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
            <Spinner
              ref={(c) => {
                this.Spinner = c;
              }}
              textStyle={{ color: '#FFF' }}
              overlayColor="rgba(0,0,0,0.5)"
              size="large"
            />

            <Api
              ref={(c) => {
                if (c) Api.ApiInstance = c;
              }}
              spinnerShow={this.spinnerShow}
              spinnerHide={this.spinnerHide}
            />


            <AppWithNavigationState
              navigation={{
                toast: this.toast,
                toastDanger: this.toastDanger,
                routeBack: this.routeBack,
                navigateTo: this.navigateTo,
                spinnerShow: this.spinnerShow,
                spinnerHide: this.spinnerHide,
                Api,
              }}
            />
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
};

function bindAction(dispatch) {
  return {
    navigateToConnect: (route, params) => dispatch(navigateTo(route, params)),
    routeBackConnect: (back_screen, params) => dispatch(routeBack(back_screen, params)),
  };
}

const mapStateToProps = state => ({
  navigation: state.navigationCard,
});

export default connect(mapStateToProps, bindAction)(AppIndex);
