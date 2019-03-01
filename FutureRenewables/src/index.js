
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import './ReactotronConfig';
import { Provider } from 'react-redux';
import { name as appName } from '../app.json';
import store from './Redux/store';

import AppIndex from './AppIndex';

class Root extends Component {
  constructor() {
    super();
    this.state = {
      store_loading: true,
      store: store(() => this.setState({ store_loading: false })),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    if (__DEV__) {
      Reactotron.connect();
      console.tron = Reactotron;
      Reactotron.clear();
    }
  }

  render() {
    // if (this.state.store_loading) {
    //   return (
    //     null
    //   )
    // } else {
      return (
        <Provider store={this.state.store}>
          <AppIndex />
        </Provider>
      );
    // }
  }
}

AppRegistry.registerComponent(appName, () => Root);
