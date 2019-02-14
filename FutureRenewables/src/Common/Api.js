
import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
} from 'react-native';

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

  fetchProc(urlInp, params, method, spinner = true) {
    const { spinnerHide, spinnerShow } = this.props;
    const options = { method };
    const url = `${Config.get().apiUrl}${urlInp}`;

    if (params) {
      options.body = JSON.stringify(params);
      options.headers = Api.headers();
    }

    if (spinner) spinnerShow();

    return fetch(url, options).then((resp) => {
      if (spinner) spinnerHide();

      const contentType = resp.headers.get('content-type') || '';
      const result = contentType.includes('json') ? resp.json() : resp.text();

      if (resp.ok) {
        return result;
      }

      // logout action
      // if (resp.status === UNAUTHORIZED) {
      // }

      return result.then((err) => {
        throw err;
      });
    });
  }

  static post(...args) {
    return this.ApiInstance.fetchProc(...args, 'POST');
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
