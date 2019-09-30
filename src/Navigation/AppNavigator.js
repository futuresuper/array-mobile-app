import { connect } from 'react-redux';
import {
  // createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import {
  createReduxContainer,
} from 'react-navigation-redux-helpers';

import {
  SplashStack,
  SignStack,
  SignDataStack,
  LocalAuthStack,
  MainStack,
  TabStack,
  TmpStack,
} from './StackNavigator';

// eslint-disable-next-line no-unused-vars
import { navReduxMiddleware } from './navMiddlewareListener';

const AppNavigator = createAppContainer(createSwitchNavigator(
  {
    SplashStack,
    SignStack,
    SignDataStack,
    LocalAuthStack,
    MainStack,
    TabStack,
    // TmpStack,
  },
  {
    initialRouteName: 'SplashStack',
  },
));

const mapStateToProps = (state, props) => ({
  state: state.navigationCard,
  screenProps: props.navigation,
});

const AppNavigatorRedux = createReduxContainer(AppNavigator);
const AppWithNavigationState = connect(mapStateToProps)(AppNavigatorRedux);

export { AppNavigator, AppWithNavigationState };
