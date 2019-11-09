
import {
  USER_UPDATE_AVATAR,
} from 'src/Redux/Auth';
import * as types from './actionTypes';

const initialState = {
  selectedAccount: '',
};

const ACTION_HANDLERS = {
  [types.APP_CONTENT_SAVE]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      ...payload,
    };
  },
  [types.APP_CONTENT_UPDATE_LIKE_TOGGLE]: (state, action) => {
    const { payload } = action;
    console.log(payload)
    return {
      ...state,
      updates: state.updates.map((update) => {
        if (update.id === payload.id) {
          return {
            ...update,
            userLiked: payload.like,
          };
        }
        return update;
      }),
    };
  },
};

ACTION_HANDLERS[USER_UPDATE_AVATAR] = (state, action) => {
  const { payload } = action;
  const { user } = state;

  if (user) {
    user.profileImage = payload;

    return {
      ...state,
      user,
    };
  }

  return {
    ...state,
  };
};

const AppContentReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default AppContentReducer;
