export const ENV_STAGING = 'staging';
export const ENV_PRODUCTION = 'production';

export const APP_ENV = {
  staging: {
    env: 'staging',
    apiUrl: 'https://hub.futurerenewablesfund.com.au/api/v1/',
    smsCode: '33',
    kleberKey: 'RK-A7331-D6238-189D0-FC8A7-C25ED-1B676-3133A-3122F',
    kleberGUID: 'a4ebd32f-2cef-4389-9ae2-288b3b7a9ee2',
  },
  production: {
    env: 'production',
    apiUrl: 'https://hub.futurerenewablesfund.com.au/api/v1/',
    smsCode: '',
    kleberKey: 'RK-A7331-D6238-189D0-FC8A7-C25ED-1B676-3133A-3122F',
    kleberGUID: 'a4ebd32f-2cef-4389-9ae2-288b3b7a9ee2',
  },
};
