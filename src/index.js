import React, { PureComponent } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRegistry } from 'react-native';
import './ReactotronConfig';
import { Provider } from 'react-redux';
import ServiceManager from 'src/Services';
import { name as appName } from '../app.json';
import { getStore, getPersistor } from './Redux/store';
import AppIndex from './AppIndex';

class Root extends PureComponent {
  componentDidMount() {
    if (__DEV__) {
      Reactotron.connect();
      console.tron = Reactotron;
      Reactotron.clear();
    }
  }

  render() {
    const myStore = getStore();
    const myPersistor = getPersistor();

    return (
      <Provider store={myStore}>
        <PersistGate loading={null} persistor={myPersistor}>
          <ServiceManager />
          <AppIndex />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Root);
