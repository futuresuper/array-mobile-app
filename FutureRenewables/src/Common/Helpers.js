
import {
  AsyncStorage,
  Platform,
} from 'react-native';

import _ from 'lodash';

export async function storeItem(key, data) {
  const response = await AsyncStorage.setItem(key, JSON.stringify(data));
  return response;
}

export async function getItem(key) {
  try {
    const data = await AsyncStorage.getItem(key);
    const response = JSON.parse(data);

    return response;
  } catch (err) {
    return err;
  }
}

export async function deleteItem(key) {
  const data = await AsyncStorage.removeItem(key);
  return data;
}

export function isObjectEmpty(obj) {
  return (Object.keys(obj).length === 0);
}

export function isIOS() {
  return (Platform.OS === 'ios');
}

export function navGetCurrentScreen(nav_state) {
  if (!nav_state) {
    return null;
  }
  const route = nav_state.routes[nav_state.index];

  if (route.routes) {
    return navGetCurrentScreen(route);
  }

  return route;
}

export function navGetParam(nav_state, param_key, default_res = null) {
  let res = default_res;
  const current_screen = navGetCurrentScreen(nav_state);

  if (
    !_.isNil(current_screen)
    && !_.isNil(current_screen.params)
  ) {
    const param_value = current_screen.params[param_key];
    if (!_.isNil(param_value)) res = param_value;
  }

  return res;
}

export function isEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
