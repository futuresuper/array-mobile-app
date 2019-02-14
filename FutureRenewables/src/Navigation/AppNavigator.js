import { connect } from 'react-redux';
import {
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import {
  createReduxContainer,
} from 'react-navigation-redux-helpers';

import DrawerNavigation from './DrawerNavigator';
// eslint-disable-next-line no-unused-vars
import { navReduxMiddleware } from './navMiddlewareListener';


const initialRoute = () => {
  const init_screen = 'drawerStack';

  return init_screen;
};

const AppNavigator = createSwitchNavigator(
  {
    drawerStack: {
      screen: DrawerNavigation,
    },
  },
  {
    initialRouteName: initialRoute(),
    headerMode: 'none',
  },
);


const mapStateToProps = (state, props) => ({
  state: state.navigationCard,
  screenProps: props.navigation,
});

const AppNavigatorRedux = createReduxContainer(AppNavigator);
const AppWithNavigationState = connect(mapStateToProps)(AppNavigatorRedux);

export { AppNavigator, AppWithNavigationState };
