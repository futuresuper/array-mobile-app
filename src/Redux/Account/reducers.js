
import _ from 'lodash';

import * as types from './actionTypes';

const initialState = {
  selectedAccount: {},
};

const ACTION_HANDLERS = {
  [types.ACCOUNT_SELECT]: (state, action) => ({
    ...state,
    selectedAccount: action.payload,
  }),
  [types.ACCOUNT_UPDATE]: (state, { payload }) => {
    const { selectedAccount } = state;
    const { id } = payload;

    if (
      !_.isNil(id)
    ) {
      if (selectedAccount.id !== id) {
        return {
          ...state,
        };
      }
    }

    return {
      ...state,
      selectedAccount: {
        ...state.selectedAccount,
        ...payload,
      },
    };
  },
};

const AccountReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

export default AccountReducer;
