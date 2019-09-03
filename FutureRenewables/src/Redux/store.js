import { AsyncStorage } from 'react-native';
import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose,
} from 'redux';
import reducers from 'src/Redux/reducers';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import { navReduxMiddleware } from 'src/Navigation/navMiddlewareListener';

const enhancers = compose;
let Reactotron = null;
let createStore = reduxCreateStore;

if (__DEV__) {
  Reactotron = require('reactotron-react-native').default;
  createStore = Reactotron.createStore;
}

export default (onCompletion) => {
  const persistConfig = {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['auth'],
  };
  const persistReducers = persistCombineReducers(persistConfig, reducers);


  const store = createStore(
    persistReducers,
    undefined,
    enhancers(
      applyMiddleware(thunk, navReduxMiddleware),
    ),
  );

  persistStore(store, null, onCompletion);

  return store;
};
