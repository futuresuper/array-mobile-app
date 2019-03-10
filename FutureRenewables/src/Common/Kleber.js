
import axios from 'axios';

import { Config } from 'src/Common/config';

class Kleber {
  CancelToken = null;
  source = null;
  kieberKey = null;
  url = 'http://kleber.datatoolscloud.net.au/KleberWebService/DtKleberService.svc/ProcessQueryStringRequest';
  axiosOptions = {
    timeout: 5000,
  }

  constructor() {
    this.kieberKey = Config.get().kieberKey;
  }

  getParams(params) {
    const res = {
      RequestKey: this.kieberKey,
      OutputFormat: 'json',
      ...params,
    };

    return res;
  }

  requestVerifyAbn() {
    const params = this.getParams({
      Method: 'DataTools.Verify.AustralianBusinessNumber.AuAbr.VerifyAbn',
    });

    return this.request(params);
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

    return new Promise((resolve) => {
      axios.get(this.url, {
        ...options,
        params,
      })
        .then((res) => {
          let data = null;
          if (res.status === 200) {
            data = res.data.DtResponse;
          }

          resolve(data);
        })
        .catch(() => {
          resolve(null);
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
