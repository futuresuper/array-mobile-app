
import * as types from './actionTypes';
import {
  formatSolarFarm,
  formatAccounts,
} from './formatters';

// eslint-disable-next-line import/prefer-default-export
export function appContentSave(dataInp) {
  const data = dataInp;

  if (data) {
    if (data.solarFarms) {
      data.solarFarms = data.solarFarms.map(formatSolarFarm);
    }

    if (data.accounts) {
      data.accounts = data.accounts.map(formatAccounts);
    }
  }

  return {
    type: types.APP_CONTENT_SAVE,
    payload: data,
  };
}

export function updateArticlieLike(data) {
  return {
    type: types.APP_CONTENT_UPDATE_LIKE_TOGGLE,
    payload: data,
  };
}

export function appContentUpdateAccount(data) {
  return {
    type: types.APP_CONTENT_UPDATE_ACCOUNT,
    payload: data,
  };
}
