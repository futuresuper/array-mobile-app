import * as types from './actionTypes';

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

export function userUpdateAvatar(data) {
  return {
    type: types.USER_UPDATE_AVATAR,
    payload: data,
  };
}

export function applicationIdSave(data) {
  return {
    type: types.APPLICATION_ID_SAVE,
    payload: data,
  };
}
