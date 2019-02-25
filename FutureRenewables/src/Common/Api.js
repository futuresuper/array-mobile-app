
import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
} from 'react-native';

import axios from 'axios';

import { Config } from 'src/Common/config';

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

  static post(...args) {
    return this.ApiInstance.fetchProc(...args, 'POST');
  }

  fetchProc(urlInp, params, method, spinner = true) {
    return new Promise((resolve, reject) => {
      const { spinnerHide, spinnerShow } = this.props;
      const options = {
        timeout: 5000,
        method,
      };
      options.url = `${Config.get().apiUrl}${urlInp}`;

      if (params) {
        options.data = params;
        options.headers = Api.headers();
      }

      if (spinner) spinnerShow();

      axios(options)
        .then((resp) => {
          if (spinner) spinnerHide();
          resolve(resp.data);
        })
        .catch((err) => {
          if (spinner) spinnerHide();
          reject(err.response.data);
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
};

export default Api;
