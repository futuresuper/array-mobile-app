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

export function idCheckSave(data) {
  return {
    type: types.ID_CHECK_SAVE,
    payload: data,
  };
}

export function pinSave(data) {
  return {
    type: types.PIN_SAVE,
    payload: data,
  };
}

export function biometricsSave(data) {
  return {
    type: types.BIOMETRICS_SAVE,
    payload: data,
  };
}

export function localAuthValidate() {
  return {
    type: types.LOCAL_AUTH_VALIDATE,
  };
}
