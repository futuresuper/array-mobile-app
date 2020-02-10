import Reactotron, { openInEditor } from 'reactotron-react-native';
import { AsyncStorage } from 'react-native';
import { reactotronRedux } from 'reactotron-redux';
import { isIOS } from 'src/Common/Helpers';


const config = {
  name: 'Future Renewables',
};
if (!isIOS()) {
  config.host = 'localhost';
}

export default Reactotron
  .configure(config)
  .useReactNative()
  .use(reactotronRedux())
  .setAsyncStorageHandler(AsyncStorage)
  .use(openInEditor())
  .connect();

const yeOldeConsoleLog = console.log;

console.log = (...args) => {
  yeOldeConsoleLog(...args);

  let preview = '';
  const argsLength = args.length;
  if (argsLength) {
    try {
      preview = JSON.stringify(args);
    } catch (e) {
      preview = '- ';
      if (typeof args[0] === 'string') {
        preview += args[0];
      }

      if ((argsLength > 1) && (typeof args[1] === 'string')) {
        preview += args[1];
      }
    }
  } else {
    ([preview] = args);
  }

  Reactotron.display({
    name: 'LOG',
    important: true,
    value: args,
    preview,
  });
};

Reactotron.clear();
