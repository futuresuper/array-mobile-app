
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
  tabCardRoutes,
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

const TabWithModal = createStackNavigator(
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
  },
);

const TabCardsWithFooter = createStackNavigator(
  tabCardRoutes,
  {
    mode: 'card',
  },
);

const TabCards = createBottomTabNavigator(
  {
    TabCardsWithFooter: {
      screen: TabCardsWithFooter,
    },
  },
  {
    ...tabBarOptions,
  },
);

export const TabStack = createStackNavigator(
  {
    TabWithModal: {
      screen: TabWithModal,
    },
    TabCards: {
      screen: TabCards,
    },
  },
  {
    headerMode: 'none',
  },
);
