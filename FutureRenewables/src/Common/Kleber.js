
import axios from 'axios';

import { Config } from 'src/Common/config';

class Kleber {
  CancelToken = null;
  source = null;
  kleberKey = null;
  url = 'http://kleber.datatoolscloud.net.au/KleberWebService/DtKleberService.svc/ProcessQueryStringRequest';
  axiosOptions = {
    timeout: 5000,
  }

  constructor() {
    this.kleberKey = Config.get().kleberKey;
  }

  getParams(params) {
    const res = {
      RequestKey: this.kleberKey,
      OutputFormat: 'json',
      ...params,
    };

    return res;
  }

  requestVerifyAbn(ABN, onSuccess = null, onError = null) {
    const params = this.getParams({
      Method: 'DataTools.Verify.AustralianBusinessNumber.AuAbr.VerifyAbn',
      AuthenticationGuid: 'a4ebd32f-2cef-4389-9ae2-288b3b7a9ee2',
      ABN,
    });

    this.request(params).then((res) => {
      onSuccess(res);
    }).catch((err) => {
      onError(err);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  requestRetrieveAddress(recordId) {
    const params = this.getParams({
      Method: 'DataTools.Capture.Address.Predictive.AuPaf.RetrieveAddress',
      RecordId: recordId,
    });

    return new Promise((resolve) => {
      axios.get(this.url, {
        ...this.axiosOptions,
        params,
      })
        .then((res) => {
          let data = null;
          if (
            (res.status === 200)
            && (res.data.DtResponse.Result.length)
          ) {
            // eslint-disable-next-line prefer-destructuring
            data = res.data.DtResponse.Result[0];
          }

          resolve(data);
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  getParamsSearchAddress() {
    const res = this.getParams({
      Method: 'DataTools.Capture.Address.Predictive.AuNzPaf.SearchAddress',
      ResultLimit: '',
      DisplayOnlyCountryCode: '',
      RequestId: '',
      DepartmentCode: '',
      AddressLine: 'unit',
    });

    return res;
  }

  requestSearchAddress(addressLine) {
    const params = this.getParamsSearchAddress();
    params.AddressLine = addressLine;

    this.abort();
    this.setCancelToken();

    return new Promise((resolve) => {
      axios.get(this.url, {
        ...this.axiosOptions,
        cancelToken: this.source.token,
        params,
      })
        .then((res) => {
          let data = [];
          if (res.status === 200) {
            data = res.data.DtResponse.Result;
          }

          resolve(data);
        })
        .catch(() => {
          resolve([]);
        });
    });
  }

  request(params, optionsInp = {}) {
    const options = {
      ...this.axiosOptions,
      ...optionsInp,
    };

    return new Promise((resolve, reject) => {
      axios.get(this.url, {
        ...options,
        params,
      })
        .then((res) => {
          let data = null;
          if (
            (res.status === 200)
          ) {
            data = res.data.DtResponse;

            if (res.data.DtResponse.ErrorMessage) {
              reject(res.data.DtResponse.ErrorMessage);
            } else {
              resolve(data);
            }
          }
        })
        .catch((err) => {
          let res = 'request error';

          // eslint-disable-next-line no-underscore-dangle
          if (err.request && err.request._response) {
            // eslint-disable-next-line no-underscore-dangle
            res = err.request._response;
          }

          reject(res);
        });
    });
  }

  setCancelToken() {
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }

  resetCancelToken() {
    this.CancelToken = null;
    this.source = null;
  }

  abort() {
    if (this.source) {
      this.source.cancel('hzhz');
    }
  }
}
const kleber = new Kleber();

export default kleber;
