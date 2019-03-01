
import { AsyncStorage } from 'react-native';
import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose,
} from 'redux';
import reducers from 'src/Redux/reducers';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import { navReduxMiddleware } from 'src/Navigation/navMiddlewareListener';

const enhancers = compose;
let Reactotron = null;
let createStore = reduxCreateStore;

if (__DEV__) {
  Reactotron = require('reactotron-react-native').default;
  createStore = Reactotron.createStore;
}

export default function store(onCompletion) {
  const store_sett = createStore(
    reducers,
    undefined,
    enhancers(
      applyMiddleware(thunk, navReduxMiddleware),
    ),
  );

  // persistStore(store_sett, { storage: AsyncStorage }, onCompletion);

  return store_sett;
}
