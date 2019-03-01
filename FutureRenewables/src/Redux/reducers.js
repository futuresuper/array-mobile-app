
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import NavReducer from './Nav';
import AuthReducer from './Auth';

const config = {
  key: 'primary',
  storage,
};

export default persistCombineReducers(config, {
  navigationCard: NavReducer,
  auth: AuthReducer,
});
