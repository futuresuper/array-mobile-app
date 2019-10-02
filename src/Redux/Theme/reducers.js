import * as types from './actionTypes';

const initialState = {
  mode: 'light',
};

const ACTION_HANDLERS = {
  [types.SET_DARK_THEME]: (state) => ({
    ...state,
    mode: 'dark',
  }),
  [types.SET_LIGHT_THEME]: (state) => ({
    ...state,
    mode: 'light',
  }),
  [types.TOGGLE_THEME]: (state) => {
    if (state.mode === 'dark') {
      return ({
        ...state,
        mode: 'light',
      });
    }
    if (state.mode === 'light') {
      return ({
        ...state,
        mode: 'dark',
      });
    }
    return ({
      ...state,
      mode: 'light',
    });
  },

};


const ThemeReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default ThemeReducer;
