
import * as types from './actionTypes';

const initialState = {};

const ACTION_HANDLERS = {
  [types.APP_CONTENT_SAVE]: (state, action) => {
    const { payload } = action;

    return {
      ...state,
      ...payload,
    };
  },
};

const AppContentReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default AppContentReducer;
