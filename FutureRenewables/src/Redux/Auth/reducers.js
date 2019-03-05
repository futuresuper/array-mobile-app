
import * as types from './actionTypes';

const initialState = {
  user: null,
  token: {
    access_token: '',
    refresh_token: '',
    token_type: '',
    expires_in: 0,
  },
};

const ACTION_HANDLERS = {
  [types.LOGIN_SUCCESS]: (state, action) => {
    const { payload } = action;

    return {
      ...state,
      token: {
        ...state.token,
        ...payload,
      },
    };
  },
  [types.TOKEN_RESET]: state => ({
    ...state,
    token: initialState,
  }),
};

const AuthReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default AuthReducer;
