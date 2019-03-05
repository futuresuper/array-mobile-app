
import axios from 'axios';

import { Config } from 'src/Common/config';

class Kleber {
  CancelToken = null;
  source = null;
  kieberKey = null;
  url = 'http://kleber.datatoolscloud.net.au/KleberWebService/DtKleberService.svc/ProcessQueryStringRequest';

  constructor() {
    this.kieberKey = Config.get().kieberKey;
  }

  getParams() {
    const res = {
      Method: 'DataTools.Capture.Address.Predictive.AuNzPaf.SearchAddress',
      RequestKey: this.kieberKey,
      ResultLimit: '',
      DisplayOnlyCountryCode: '',
      RequestId: '',
      DepartmentCode: '',
      OutputFormat: 'json',
      AddressLine: 'unit',
    };

    return res;
  }

  request(addressLine) {
    const params = this.getParams();
    params.AddressLine = addressLine;

    this.abort();
    this.setCancelToken();

    return new Promise((resolve) => {
      axios.get(this.url, {
        timeout: 5000,
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
