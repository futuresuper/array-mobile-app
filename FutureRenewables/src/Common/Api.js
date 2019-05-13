
import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';
import {
  Platform,
} from 'react-native';

import axios from 'axios';

// import Amplify from 'aws-amplify';

import AwsAmplify from 'src/Common/AwsAmplify';
import { Config } from 'src/Common/config';
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

  static fetch(...args) {
    return this.ApiInstance.fetchProc(...args);
  }

  static put(urlInp, params, onSuccess = null, onError = null, spinner = true) {
    return this.ApiInstance.fetchProc(urlInp, params, onSuccess, onError, spinner, 'PUT');
  }

  static post(urlInp, params, onSuccess = null, onError = null, spinner = true) {
    return this.ApiInstance.fetchProc(urlInp, params, onSuccess, onError, spinner, 'POST');
  }

  static get(urlInp, params, onSuccess = null, onError = null, spinner = true) {
    return this.ApiInstance.fetchProc(urlInp, params, onSuccess, onError, spinner, 'GET');
  }

  static signIn(phoneNumber) {
    this.ApiInstance.spinnerShow();

    return new Promise((resolve, reject) => {
      AwsAmplify.signIn(phoneNumber).then((res) => {
        this.ApiInstance.spinnerHide();
        resolve(res);
      }).catch((err) => {
        if (err.code && err.code === 'UserNotFoundException') {
          AwsAmplify.signUp(phoneNumber, phoneNumber).then((res) => {
            this.ApiInstance.spinnerHide();
            resolve(res);
          }).catch((errs) => {
            this.ApiInstance.spinnerHide();
            reject(errs);
          });
        } else {
          this.ApiInstance.spinnerHide();
          reject(err);
        }
      });
    });
  }

  static answerCustomChallenge(phoneNumber, answer) {
    AwsAmplify.answerCustomChallenge(phoneNumber, answer).then(res => {
      console.log('!!!', { res });
    }).catch(err => {
      console.log('!!!', { err });
    });
  }

  componentWillMount() {
    const { ownProps } = this.props;
    ownProps.setRef(this);
  }

  componentWillUnmount() {
    const { ownProps } = this.props;
    ownProps.setRef(null);
  }

  fetchProc = (urlInp, params, onSuccess = null, onError = null, spinner = true, method = 'POST') => {
    const proc = (resolve = null, reject = null) => {
      const {
        spinnerHide,
        spinnerShow,
        token,
        navigateTo,
        authResetConnect,
        toast,
      } = this.props;
      const options = {
        timeout: 5000,
        method,
      };
      options.url = `${Config.get().apiUrl}${urlInp}`;

      if (params) {
        options.data = params;
      }
      options.headers = Api.headers();

      if (token && token.access_token) {
        options.headers.Authorization = `Bearer ${token.access_token}`;
      }

      if (spinner) spinnerShow();

      axios(options)
        .then((resp) => {
          if (spinner) spinnerHide();

          if (onSuccess) onSuccess(resp.data);
          else if (resolve) resolve(resp.data);
        })
        .catch((err) => {
          if (spinner) spinnerHide();
          let resp = {
            message: '',
            err,
          };

          if (err.response && err.response.data) {
            resp = err.response.data;
          } else {
            // eslint-disable-next-line no-underscore-dangle
            resp.message = err.request._response;
          }

          if (!resp.message) {
            resp.message = apiError.unknown;
          }

          if (
            err.request
            && (err.request.status === UNAUTHORIZED)
          ) {
            authResetConnect();
            navigateTo('SignUpLogin');

            resp.message = apiError.unauthenticated;
          }

          if (onError) onError(resp);
          else if (reject) reject(resp);
          else {
            toast(resp.message);
          }
        });
    };

    if (onSuccess) {
      proc();
      return true;
    }

    return new Promise(proc);

    // return fetch(url, options).then((resp) => {
    //   if (spinner) spinnerHide();

    //   const contentType = resp.headers.get('content-type') || '';
    //   const result = contentType.includes('json') ? resp.json() : resp.text();

    //   if (resp.ok) {
    //     return result;
    //   }

    //   // logout action
    //   // if (resp.status === UNAUTHORIZED) {
    //   // }

    //   return result.then((err) => {
    //     throw err;
    //   });
    // });
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
  token: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  ownProps,
});

const mapDispatchToProps = {
  authResetConnect: authReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Api);
