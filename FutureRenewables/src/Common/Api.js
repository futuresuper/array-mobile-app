
import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';
import {
  Platform,
} from 'react-native';

import axios from 'axios';

import { Config } from 'src/Common/config';
import {
  tokenReset,
} from 'src/Redux/Auth';

const UNAUTHORIZED = 401;

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

  static post(urlInp, params, onSuccess = null, onError = null, spinner = true) {
    return this.ApiInstance.fetchProc(urlInp, params, onSuccess, onError, spinner, 'POST');
  }

  static get(urlInp, params, onSuccess = null, onError = null, spinner = true) {
    return this.ApiInstance.fetchProc(urlInp, params, onSuccess, onError, spinner, 'GET');
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
  fetchProc = (urlInp, params, onSuccess = null, onError = null, spinner = true, method = 'POST') => {
    return new Promise((resolve, reject) => {
      const {
        spinnerHide,
        spinnerShow,
        token,
        navigateTo,
        tokenResetConnect,
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
          else resolve(resp.data);
        })
        .catch((err) => {
          if (spinner) spinnerHide();
          console.log('!!!api', err);
          let resp = {
            message: 'unknown error',
          };

          if (err.response && err.response.data) {
            resp = err.response.data;
          } else {
            // eslint-disable-next-line no-underscore-dangle
            resp.message = err.request._response;
          }

          if (
            err.request
            && (err.request.status === UNAUTHORIZED)
          ) {
            tokenResetConnect();
            navigateTo('SignUpLogin');
          }

          if (onError) onError(resp);
          else reject(resp);
        });
    });

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

  // eslint-disable-next-line class-methods-use-this
  render() {
    return null;
  }
}

Api.propTypes = {
  spinnerShow: PropTypes.func.isRequired,
  spinnerHide: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  tokenResetConnect: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  ownProps: PropTypes.any.isRequired,
  token: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  ownProps,
});

const mapDispatchToProps = {
  tokenResetConnect: tokenReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Api);
