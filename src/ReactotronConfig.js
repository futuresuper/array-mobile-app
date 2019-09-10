/* eslint-disable global-require */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-global-assign */

import {
  isIOS,
} from 'src/Common/Helpers';

if (__DEV__) {
  Reactotron = require('reactotron-react-native').default;
  openInEditor = require('reactotron-react-native').openInEditor;
  reactotronRedux = require('reactotron-redux').reactotronRedux;

  const config = {};
  if (!isIOS()) {
    config.host = 'localhost';
  }

  Reactotron
    .configure(config) // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(reactotronRedux())
    .use(openInEditor());

  const nativeLog = console.log;
  console.log = (...args) => {
    nativeLog(...args);

    Reactotron.display({
      name: 'LOG',
      important: true,
      value: args,
      preview: args.length ? JSON.stringify(args) : args[0],
    });
  };
}