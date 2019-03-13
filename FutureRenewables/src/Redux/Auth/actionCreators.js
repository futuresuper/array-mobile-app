
import * as types from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export function tokenSave(data) {
  return {
    type: types.TOKEN_SAVE,
    payload: data,
  };
}

export function tokenReset() {
  return {
    type: types.TOKEN_RESET,
  };
}

export function userDataSave(data) {
  return {
    type: types.USER_DATA_SAVE,
    payload: data,
  };
}

export function authReset() {
  return {
    type: types.AUTH_RESET,
  };
}
