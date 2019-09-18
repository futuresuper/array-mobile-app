/* eslint-disable import/prefer-default-export */
import * as types from './actionTypes';

export function accountSelectSave(account) {
  return {
    type: types.ACCOUNT_SELECT,
    payload: account,
  };
}

export function accountUpdateSave(account) {
  return {
    type: types.ACCOUNT_UPDATE,
    payload: account,
  };
}
