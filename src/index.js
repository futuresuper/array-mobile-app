import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRegistry } from 'react-native';
import amplitude from 'amplitude-js';
import { Provider } from 'react-redux';
import { name as appName } from '../app.json';
import { getStore, getPersistor } from './Redux/store';
import AppIndex from './AppIndex';

class Root extends Component {
  componentDidMount() {
    this.initAnalytics();
  }

  initAnalytics() {
    if (__DEV__) {
      amplitude.getInstance().init('827d292a9803561f32da202c0ad78a6e', null, {
        useNativeDeviceInfo: false,
      });
    } else {
      amplitude.getInstance().init('64dd18a0f55a3c423e15a30e57d5ca30', null, {
        useNativeDeviceInfo: false,
      });
    }
  }

  render() {
    const myStore = getStore();
    const myPersistor = getPersistor();

    return (
      <Provider store={myStore}>
        {/* potential add splash screen here instead of blank(null) one */}
        <PersistGate loading={null} persistor={myPersistor}>
          <AppIndex />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Root);
