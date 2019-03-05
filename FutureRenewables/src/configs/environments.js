export const ENV_STAGING = 'staging';
export const ENV_PRODUCTION = 'production';

export const APP_ENV = {
  staging: {
    env: 'staging',
    apiUrl: 'https://api.staging.futurerenewablesfund.com.au/api/v1/',
    smsCode: '33',
    kieberKey: 'RK-A7331-D6238-189D0-FC8A7-C25ED-1B676-3133A-3122F',
  },
  production: {
    env: 'production',
    apiUrl: 'https://api.staging.futurerenewablesfund.com.au/api/v1/',
    smsCode: '',
    kieberKey: 'RK-A7331-D6238-189D0-FC8A7-C25ED-1B676-3133A-3122F',
  },
};
