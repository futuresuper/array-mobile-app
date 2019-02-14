
if (__DEV__) {
  Reactotron = require('reactotron-react-native').default;
  openInEditor = require('reactotron-react-native').openInEditor;
  reactotronRedux = require('reactotron-redux').reactotronRedux;

  Reactotron
    // .configure({ host: '192.168.0.142' }) // controls connection & communication settings
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
