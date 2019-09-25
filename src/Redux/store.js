import {AsyncStorage} from 'react-native';
import {createStore as reduxCreateStore, applyMiddleware, compose} from 'redux';
import reducers from 'src/Redux/reducers';
import {persistStore, persistCombineReducers} from 'redux-persist';
import thunk from 'redux-thunk';
import {navReduxMiddleware} from 'src/Navigation/navMiddlewareListener';
import Reactotron from 'src/ReactotronConfig';

let createStore = reduxCreateStore;

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  whitelist: ['auth'],
};
const persistReducers = persistCombineReducers(persistConfig, reducers);
const middleware = applyMiddleware(thunk, navReduxMiddleware);
const enhancer = [middleware];

if (__DEV__) {
  enhancer.push(Reactotron.createEnhancer());
}

const store = createStore(persistReducers, undefined, compose(...enhancer));
const persistor = persistStore(store);

const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => store.getState();

export {getStore, getState, getPersistor};
// persistStore(store, null, onCompletion);
