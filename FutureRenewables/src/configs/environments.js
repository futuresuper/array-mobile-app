export const ENV_STAGING = 'staging';
export const ENV_PRODUCTION = 'production';

export const APP_ENV = {
  staging: {
    env: 'staging',
    apiUrl: 'https://hub.futurerenewablesfund.com.au/api/v1/',
    smsCode: '33',
    kleberKey: 'RK-A7331-D6238-189D0-FC8A7-C25ED-1B676-3133A-3122F',
    kleberGUID: 'a4ebd32f-2cef-4389-9ae2-288b3b7a9ee2',
    darkSkyKey: 'ff42a48b5252012ba41104cadbb0a417',
    apiGateway: {
      REGION: 'ap-southeast-2',
      URL: 'https://izmhcj8u9g.execute-api.ap-southeast-2.amazonaws.com/dev',
    },
    cognito: {
      REGION: 'ap-southeast-2',
      USER_POOL_ID: 'ap-southeast-2_HiFaMSkK4',
      APP_CLIENT_ID: 'ol0or0b4ojg5930fmpavppqnu',
      IDENTITY_POOL_ID: 'ap-southeast-2:5e48be46-0cdb-479a-8617-417bba6a8313',
    },
  },
  production: {
    env: 'production',
    apiUrl: 'https://hub.futurerenewablesfund.com.au/api/v1/',
    smsCode: '',
    kleberKey: 'RK-A7331-D6238-189D0-FC8A7-C25ED-1B676-3133A-3122F',
    kleberGUID: 'a4ebd32f-2cef-4389-9ae2-288b3b7a9ee2',
    darkSkyKey: 'ff42a48b5252012ba41104cadbb0a417',
    apiGateway: {
      REGION: 'ap-southeast-2',
      URL: 'https://izmhcj8u9g.execute-api.ap-southeast-2.amazonaws.com/dev',
    },
    cognito: {
      REGION: 'ap-southeast-2',
      USER_POOL_ID: 'ap-southeast-2_HiFaMSkK4',
      APP_CLIENT_ID: 'ol0or0b4ojg5930fmpavppqnu',
      IDENTITY_POOL_ID: 'ap-southeast-2:5e48be46-0cdb-479a-8617-417bba6a8313',
    },
  },
};
