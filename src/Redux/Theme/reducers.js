import * as types from './actionTypes';

const initialState = {
  name: '',
};

const ACTION_HANDLERS = {
  [types.SET_DARK_THEME]: (state) => ({
    ...state,
    name: 'dark',
  }),
  [types.SET_LIGHT_THEME]: (state) => ({
    ...state,
    name: 'light',
  }),
  [types.TOGGLE_THEME]: (state) => {
    if (state.name === 'dark') {
      return ({
        ...state,
        name: 'light',
      });
    }
    if (state.name === 'light') {
      return ({
        ...state,
        name: 'dark',
      });
    }
    return ({
      ...state,
      name: 'light',
    });
  },

};


const ThemeReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default ThemeReducer;
