import * as types from './actionTypes';

const initialState = {
  user: null,
  localAuth: {
    pin: false,
    biometrics: false,
    expires_in: '',
  },
  token: {
    access_token: '',
    refresh_token: '',
    token_type: '',
    expires_in: 0,
  },
};

const ACTION_HANDLERS = {
  [types.TOKEN_SAVE]: (state, action) => {
    const { payload } = action;

    return {
      ...state,
      token: {
        ...state.token,
        ...payload,
      },
    };
  },
  [types.AUTH_RESET]: (state) => ({
    ...state,
    ...initialState,
  }),
  [types.USER_DATA_SAVE]: (state, action) => ({
    ...state,
    user: action.payload,
  }),
  [types.USER_DATA_UPDATE]: (state, action) => {
    console.log('action!', action);
    console.log('state', state);
    return {
      ...state,
      user: {
        ...state.user,
        ...action.payload,
      },
    };
  },
  [types.USER_UPDATE_AVATAR]: (state, action) => {
    const { payload } = action;
    const { user } = state;

    if (user) {
      user.profileImage = payload;
    }

    return {
      ...state,
      user,
    };
  },
  [types.ID_CHECK_SAVE]: (state, action) => {
    const { payload } = action;
    const { user } = state;

    if (user) {
      user.idCheck = payload;
    }

    return {
      ...state,
      user,
    };
  },
  [types.PIN_SAVE]: (state, action) => ({
    ...state,
    localAuth: {
      ...state.localAuth,
      pin: action.payload,
    },
  }),
  [types.BIOMETRICS_SAVE]: (state, action) => ({
    ...state,
    localAuth: {
      ...state.localAuth,
      biometrics: action.payload,
    },
  }),
  [types.LOCAL_AUTH_VALIDATE]: (state) => ({
    ...state,
    localAuth: {
      ...state.localAuth,
      expires_in: Math.floor(Date.now() / 1000) + 60, // sets expiery date to 30 minutes from now
    },
  }),
};

const AuthReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default AuthReducer;
