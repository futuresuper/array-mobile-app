
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import './ReactotronConfig';
import { Provider } from 'react-redux';

import ServiceManager from 'src/Services';

import { name as appName } from '../app.json';
import store from './Redux/store';

import AppIndex from './AppIndex';

class Root extends Component {
  constructor() {
    super();
    this.state = {
      hydrated: false,
      store: store(() => this.setState({ hydrated: true })),
    };
  }

  componentDidMount() {
    if (__DEV__) {
      Reactotron.connect();
      console.tron = Reactotron;
      Reactotron.clear();
    }
  }

  render() {
    const { store: storeState, hydrated } = this.state;

    return (
      <Provider store={storeState}>
        <ServiceManager />
        <AppIndex
          hydrated={hydrated}
        />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Root);
