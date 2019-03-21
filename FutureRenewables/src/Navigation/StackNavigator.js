
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import {
  signRoutes,
  mainRoutes,
  mainModalRoutes,
  tabRoutes,
  tabModalRoutes,
} from './routes';

import {
  tabBarOptions,
  tabModalOptions,
} from './navigationOptions';

export const MainModalStack = createStackNavigator(
  mainModalRoutes,
  {
    mode: 'card',
    headerMode: 'float',
  },
);

export const MainStack = createStackNavigator(
  mainRoutes,
  {
    headerMode: 'float',
  },
);

export const SignStack = createStackNavigator(
  signRoutes,
  {
    headerMode: 'float',
  },
);

const TabBar = createBottomTabNavigator(
  tabRoutes,
  tabBarOptions,
);

const TabModal = createBottomTabNavigator(
  tabModalRoutes,
  {
    mode: 'modal',
    headerMode: 'none',
    ...tabBarOptions,
    ...tabModalOptions,
  },
);

export const TabStack = createStackNavigator(
  {
    TabBar: {
      screen: TabBar,
    },
    TabModal: {
      screen: TabModal,
    },
  },
  {
    mode: 'modal',
    // headerMode: 'none',
  },
);
