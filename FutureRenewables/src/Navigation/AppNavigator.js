import { connect } from 'react-redux';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import {
  createReduxContainer,
} from 'react-navigation-redux-helpers';

import {
  SignStack,
  MainStack,
  MainModalStack,
} from './StackNavigator';

// eslint-disable-next-line no-unused-vars
import { navReduxMiddleware } from './navMiddlewareListener';


const initialRoute = () => {
  const init_screen = 'SignStack';

  return init_screen;
};

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    SignStack,
    MainStack,
    // MainModalStack,
  },
  {
    initialRouteName: initialRoute(),
  },
));

const mapStateToProps = (state, props) => ({
  state: state.navigationCard,
  screenProps: props.navigation,
});

const AppNavigatorRedux = createReduxContainer(AppNavigator);
const AppWithNavigationState = connect(mapStateToProps)(AppNavigatorRedux);

export { AppNavigator, AppWithNavigationState };
