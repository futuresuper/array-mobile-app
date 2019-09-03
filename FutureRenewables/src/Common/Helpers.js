
import {
  AsyncStorage,
  Platform,
} from 'react-native';

import _ from 'lodash';

import moment from './moment';

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
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const normalizeAmount = (valueInp) => {
  let value = valueInp;

  if (value) {
    value = value.replace(/[^0-9]/g, '');
  }

  return value;
};


export function formatAmount(amountInp, decimalCountInp = 0, decimal = '.', thousands = ',', length = 3) {
  let amount = amountInp;
  try {
    let decimalCount = Math.abs(decimalCountInp);
    decimalCount = Number.isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount), 10).toString();
    const j = (i.length > length) ? i.length % length : 0;

    const pattern = `(\\d{${length}})(?=\\d)`;
    const regExp = new RegExp(pattern, 'g');

    // eslint-disable-next-line max-len
    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(regExp, `$1${thousands}`) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
  } catch (e) {
    return 'error';
  }
}

export const formatAmountDollar = (inputInp, decimalCountInp = 0) => {
  let input = inputInp;

  if (typeof input !== 'string') {
    input = input.toString();
  }

  if (Number.isNaN(parseInt(input[input.length - 1], 10))) {
    input = input.slice(0, -1);
  } else {
    const convertedInput = formatAmount(input, decimalCountInp);

    input = `$${convertedInput}`;
  }

  return input;
};

export const formatAmountDollarCent = val => formatAmountDollar(val, 2);

export const formatShortDate = (valInp) => {
  let val = valInp;
  if (val.length > 6) {
    val = val.slice(0, -1);
  }

  const res = formatAmount(val, 0, '.', '.', 2);

  return res;
};

export const isShortDateValid = valInp => (valInp.length >= 6);

export const rgbaByHex = (hexInp, opacity) => {
  const hex = hexInp.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const res = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  return res;
};

export const ucFirst = string => string.charAt(0).toUpperCase() + string.slice(1);

export const getTimeLapse = (currentTimeInp = null) => {
  let currentTime;
  if (currentTimeInp) {
    currentTime = moment(currentTimeInp);
  } else {
    currentTime = moment();
  }

  const format = 'HH:mm';
  const currentTimeFormat = currentTime.format(format);
  const currentHour = moment(currentTimeFormat, format);

  const res = {
    isSunrise: currentHour.isBetween(moment('05:00', format), moment('09:59', format)),
    isDay: currentHour.isBetween(moment('10:00', format), moment('15:59', format)),
    isSunset: currentHour.isBetween(moment('16:00', format), moment('18:59', format)),
    isNight: currentHour.isBetween(moment('19:00', format), moment('04:59', format)),
  };

  return res;
};
