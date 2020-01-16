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
  Reactotron.display({
    name: 'LOG',
    important: true,
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};

Reactotron.clear();
