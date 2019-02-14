
import {
  APP_ENV,
  ENV_STAGING,
  ENV_PRODUCTION,
} from 'src/configs/environments';

export const isProd = () => !__DEV__;

export class Config {
  env = null;

  constructor() {
    if (!Config.instance) {
      Config.instance = this;
    }
    return Config.instance;
  }

  static get() {
    let res;
    if (isProd()) {
      res = APP_ENV[ENV_PRODUCTION];
    } else {
      res = APP_ENV[ENV_STAGING];
    }
    return res;
  }
}
