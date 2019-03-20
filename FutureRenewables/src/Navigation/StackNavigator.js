
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import {
  signRoutes,
  mainRoutes,
  mainModalRoutes,
  tabRoutes,
} from './routes';

import {
  tabBarOptions,
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

export const TabStack = createStackNavigator(
  {
    TabBar: {
      screen: TabBar,
    },
  },
  // {
  //   headerMode: 'none',
  // },
);
