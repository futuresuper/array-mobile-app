
import * as types from './actionTypes';
import {
  formatSolarFarm,
} from './formatters';

// eslint-disable-next-line import/prefer-default-export
export function appContentSave(dataInp) {
  const data = dataInp;

  if (data || data.solarFarms) {
    data.solarFarms = data.solarFarms.map(formatSolarFarm);
  }

  return {
    type: types.APP_CONTENT_SAVE,
    payload: data,
  };
}
