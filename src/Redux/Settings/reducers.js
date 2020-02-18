
import settingsUtils from 'src/Common/settings';

import * as types from './actionTypes';

const initialState = {
  appMode: settingsUtils.APP_MODE.NORMAL,
};

const ACTION_HANDLERS = {
  [types.SETTINGS_SET_NORMAL_MODE]: (state) => ({
    ...state,
    appMode: settingsUtils.APP_MODE.NORMAL,
  }),
  [types.SETTINGS_SET_TEST_MODE]: (state) => ({
    ...state,
    appMode: settingsUtils.APP_MODE.TEST,
  }),
};


const SettingsReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default SettingsReducer;
