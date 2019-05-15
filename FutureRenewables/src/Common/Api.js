
import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';
import {
  Platform,
} from 'react-native';

import { API } from 'aws-amplify';

import AwsAmplify from 'src/Common/AwsAmplify';
import {
  authReset,
} from 'src/Redux/Auth';

const UNAUTHORIZED = 401;
const apiError = {
  unknown: 'unknown error',
  unauthenticated: 'Unauthenticated',
};


class Api extends Component {
  static headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      dataType: 'json',
      'User-Agent': `RN/ ${Platform.OS}`,
    };
  }

  static ApiInstance;

  static async signIn(phoneNumber, signUp = true) {
    let signInErr;

    this.ApiInstance.spinnerShow();

    try {
      await AwsAmplify.signIn(phoneNumber);
    } catch (e) {
      signInErr = e;
    }

    if (!signInErr) {
      this.ApiInstance.spinnerHide();
      return true;
    }

    if (signInErr.code !== 'UserNotFoundException') {
      throw signInErr;
    }

    if (!signUp) {
      this.ApiInstance.spinnerHide();

      const signUpErr = 'Unknown error';
      throw signUpErr;
    }

    await AwsAmplify.signUp(phoneNumber, phoneNumber);
    const signin = await this.signIn(phoneNumber, false);
    return signin;
  }

  static async answerCustomChallenge(answer) {
    this.ApiInstance.spinnerShow();

    return new Promise((resolve, reject) => {
      AwsAmplify.answerCustomChallenge(answer).then(resolve).catch(reject)
        .finally(() => {
          this.ApiInstance.spinnerHide();
        });
    });
  }

  // static fetch(...args) {
  //   return this.ApiInstance.fetchProc(...args);
  // }

  // static put(urlInp, params, onSuccess = null, onError = null, spinner = true) {
  //   return this.ApiInstance.fetchProc(urlInp, params, onSuccess, onError, spinner, 'PUT');
  // }

  // static get(urlInp, params, onSuccess = null, onError = null, spinner = true) {
  //   return this.ApiInstance.fetchProc(urlInp, params, onSuccess, onError, spinner, 'GET');
  // }

  static post(path, body, onSuccess = null, onError = null, spinner = true) {
    return this.ApiInstance.proc(path, body, onSuccess, onError, 'post', spinner);
  }

  componentWillMount() {
    const { ownProps } = this.props;
    ownProps.setRef(this);
  }

  componentWillUnmount() {
    const { ownProps } = this.props;
    ownProps.setRef(null);
  }

  // eslint-disable-next-line class-methods-use-this
  proc(path, body, onSuccess = null, onError = null, method, spinner = false) {
    const { toast, navigateTo, authResetConnect } = this.props;
    const apiName = 'array';
    const options = {
      body,
    };

    if (spinner) {
      this.spinnerShow();
    }

    API[method](apiName, path, options).then((res) => {
      this.spinnerHide();

      if (onSuccess) {
        onSuccess(res);
      }
    }).catch((err) => {
      this.spinnerHide();

      if (
        err.request
        && (err.request.status === UNAUTHORIZED)
      ) {
        authResetConnect();
        navigateTo('SignUpLogin');
        toast(apiError.unauthenticated);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (onError) {
          onError(err);
        }
      }
    });
  }

  spinnerShow() {
    const { spinnerShow } = this.props;
    spinnerShow();
  }

  spinnerHide() {
    const { spinnerHide } = this.props;
    spinnerHide();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }
}

Api.propTypes = {
  spinnerShow: PropTypes.func.isRequired,
  spinnerHide: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  authResetConnect: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  ownProps: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ownProps,
});

const mapDispatchToProps = {
  authResetConnect: authReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Api);
