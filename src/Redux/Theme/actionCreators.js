import * as types from './actionTypes';

export function setLightThemeAction() {
  return {
    type: types.SET_LIGHT_THEME,
  };
}

export function setDarkThemeAction() {
  return {
    type: types.SET_DARK_THEME,
  };
}


export function toggleThemeAction() {
  return {
    type: types.TOGGLE_THEME,
  };
}
