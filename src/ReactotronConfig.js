import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import {isIOS} from 'src/Common/Helpers';

let reactotron;
const config = {
  name: 'Future Renewables',
};
if (!isIOS()) {
  config.host = 'localhost';
}

reactotron = Reactotron.configure(config)
  .use(reactotronRedux())
  .connect();

// monkey patch console.log to send log to reactotron
const yeOldeConsoleLog = console.log;
console.log = (...args) => {
  yeOldeConsoleLog(...args);
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};

export default reactotron;
