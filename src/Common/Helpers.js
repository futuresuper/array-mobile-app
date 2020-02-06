
import {
  Platform,
  AsyncStorage,
} from 'react-native';

import { isNil } from 'lodash';

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
    !isNil(current_screen)
    && !isNil(current_screen.params)
  ) {
    const param_value = current_screen.params[param_key];
    if (!isNil(param_value)) res = param_value;
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

let oldDateStripped;
export function formatFullDate(newDate) {
  if (!newDate) { return newDate; }
  const newDateStripped = newDate.replace(/\D/g, '');
  const isBackspace = oldDateStripped >= newDateStripped;
  let finalDate;
  let f = newDateStripped;
  if (isBackspace) {
    f = (newDateStripped.length === 2 && oldDateStripped.length === 2
      || newDateStripped.length === 4 && oldDateStripped.length === 4)
      ? newDateStripped.substring(0, newDateStripped.length - 1)
      : newDateStripped;
  }
  oldDateStripped = f;
  let final;
  if (f.length < 2) { final = f; } else if (f.length < 4) { final = `${f.slice(0, 2)}${'/'}${f.slice(2, 4)}`; } else { final = `${f.slice(0, 2)}${'/'}${f.slice(2, 4)}${'/'}${f.slice(4, 8)}`; }
  return final;
}

export const normalizeFullDate = (valueInp) => {
  let value = valueInp;
  if (value) {
    value = value.replace(/[^0-9]/g, '');
  }
  return value;
};

export const normalizeBSB = (valueInp) => {
  let value = valueInp;

  if (value) {
    value = value.replace(/[^0-9]/g, '');
  }

  if (value.length > 6) {
    value = value.slice(0, -1);
  }

  return value;
};

export const formatBSB = (inputInp) => {
  let input = inputInp;

  if (typeof input !== 'string') {
    input = input.toString();
  }

  if (input.length > 6) {
    input = input.slice(0, -1);
  }

  if (input.length > 3) {
    const inputArr = input.match(/.{1,3}/g);
    input = inputArr.join('-');
  }

  return input;
};

export const validatorBSB = (value) => (value.length < 6);

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

export const formatAmountDollarCent = (val) => formatAmountDollar(val, 2);

export const formatShortDate = (valInp) => {
  let val = valInp;
  if (val.length > 6) {
    val = val.slice(0, -1);
  }

  const res = formatAmount(val, 0, '.', '.', 2);

  return res;
};

export const isShortDateValid = (valInp) => (valInp.length >= 6);

export const rgbaByHex = (hexInp, opacity) => {
  const hex = hexInp.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const res = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  return res;
};

export const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getTimeLapse = (time) => {
  const format = 'hh:mm A';
  const res = {
    isDawn: time.isBetween(moment('06:00 AM', format), moment('10:00 AM', format)),
    isDay: time.isBetween(moment('10:00 AM', format), moment('04:00 PM', format)),
    isDusk: time.isBetween(moment('04:00 PM', format), moment('07:00 PM', format)),
    isEvening: time.isBetween(moment('07:00 PM', format), moment('10:00 PM', format)),
    isNight: time.isBetween(moment('10:00 PM', format), moment('06:00 AM', format)),
  };

  return res;
};
