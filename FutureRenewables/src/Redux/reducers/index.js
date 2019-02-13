
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import navigationCard from './navigationCard';

const config = {
  key: 'primary',
  storage,
};

export default persistCombineReducers(config, {
  navigationCard,
});
