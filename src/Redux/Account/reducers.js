import * as types from './actionTypes';

const initialState = {
  selectedAccount: {},
};

const ACTION_HANDLERS = {
  [types.ACCOUNT_SELECT]: (state, action) => ({
    ...state,
    selectedAccount: action.payload,
  }),
  [types.ACCOUNT_UPDATE]: (state, action) => ({
    ...state,
    selectedAccount: {
      ...state.selectedAccount,
      ...action.payload,
    },
  }),
};

const AuthReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default AuthReducer;
