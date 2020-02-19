import * as types from './actionTypes';

export function settingsSetNormalMode() {
  return {
    type: types.SETTINGS_SET_NORMAL_MODE,
  };
}

export function settingsSetTestMode() {
  return {
    type: types.SETTINGS_SET_TEST_MODE,
  };
}
