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
  // eslint-disable-next-line global-require
  Reactotron = require('reactotron-react-native').default;
  // eslint-disable-next-line prefer-destructuring
  createStore = Reactotron.createStore;
}

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
const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => store.getState();

export {
  getStore,
  getState,
  getPersistor,
};
// persistStore(store, null, onCompletion);
