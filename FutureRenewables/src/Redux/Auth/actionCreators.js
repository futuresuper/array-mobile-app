
import * as types from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export function loginSuccess(data) {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
}

export function tokenReset(data) {
  return {
    type: types.TOKEN_RESET,
    payload: data,
  };
}
