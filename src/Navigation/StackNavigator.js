import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Splash from 'src/Screens/Splash';

import {
  signRoutes, signDataRoutes, localAuthRoutes, mainRoutes, tabBarModalRootRoutes, tabRoutes, tabBarModalRoutes, tabCardRoutes, tmpRoutes,
} from './routes';

import { tabBarOptions, tabModalOptions } from './navigationOptions';

import routeNames from './routeNames';

export const SplashStack = createStackNavigator(
  {
    [routeNames.SPLASH]: {
      screen: Splash,
    },
  },
  {
    headerMode: 'none',
  },
);

export const MainStack = createStackNavigator(mainRoutes, {
  headerMode: 'float',
});

export const SignStack = createStackNavigator(signRoutes, {
  headerMode: 'screen',
});

export const SignDataStack = createStackNavigator(signDataRoutes, {
  headerMode: 'screen',
});

export const LocalAuthStack = createStackNavigator(localAuthRoutes, {
  headerMode: 'screen',
});

export const TmpStack = createStackNavigator(tmpRoutes, {
  headerMode: 'none',
});

const TabBar = createBottomTabNavigator(tabRoutes, tabBarOptions);

const TabBarModalRootRoutes = () => {
  const tabBarModalRoutesKeys = Object.keys(tabBarModalRootRoutes);
  const allModalRoutes = {};
  tabBarModalRoutesKeys.forEach((modalRouteKey) => {
    const modalRoutesConfigValue = tabBarModalRootRoutes[modalRouteKey];
    const modalRoute = tabModalOptions(modalRoutesConfigValue);

    const stack = createStackNavigator({
      [modalRouteKey]: modalRoute,
    });

    allModalRoutes[modalRouteKey] = stack;
  });

  return allModalRoutes;
};

const TabBarModal = createBottomTabNavigator(tabBarModalRoutes, {
  mode: 'modal',
  headerMode: 'none',
  ...tabBarOptions,
  ...tabModalOptions(),
});

const TabWithModal = createStackNavigator(
  {
    TabBar: {
      screen: TabBar,
    },
    TabBarModal: {
      screen: TabBarModal,
    },
  },
  {
    mode: 'modal',
    // headerMode: 'none',
  },
);

const TabCardsWithFooter = createStackNavigator(tabCardRoutes, {
  mode: 'card',
});

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

export const TabSubStack = createStackNavigator(
  {
    TabBar: {
      screen: TabWithModal,
    },
    TabCards: {
      screen: TabCards,
    },
    TmpStack: {
      screen: TmpStack,
    },
  },
  {
    headerMode: 'none',
  },
);

export const TabStack = createStackNavigator(
  {
    TabSubStack: {
      screen: TabSubStack,
    },
    ...TabBarModalRootRoutes(),
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
