
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationActions,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import {
  signRoutes,
  mainRoutes,
  tabBarModalRootRoutes,
  tabRoutes,
  tabBarModalRoutes,
  tabCardRoutes,
  tmpRoutes,
} from './routes';

import {
  tabBarOptions,
  tabModalOptions,
} from './navigationOptions';

export const MainStack = createStackNavigator(
  mainRoutes,
  {
    headerMode: 'float',
  },
);

export const SignStack = createStackNavigator(
  signRoutes,
  {
    headerMode: 'screen',
  },
);

export const TmpStack = createStackNavigator(
  tmpRoutes,
  {
    headerMode: 'none',
  },
);

const TabBar = createBottomTabNavigator(
  tabRoutes,
  tabBarOptions,
);

// console.log('!!!', { tabBarModalRoutes });

const hz = createStackNavigator(
  tabBarModalRoutes,
  {
    // headerMode: 'none',
    // ...tabModalOptions,
  },
);

// const TabBarModalHz = {
//   DepositWithdraw: createStackNavigator(
//     {
//       DepositWithdraw: tabBarModalRoutes.DepositWithdraw
//     },
//     {
//     // headerMode: 'none',
//       ...tabModalOptions,
//     },
//   ),
//   DepositWithdrawDone: createStackNavigator(
//     {DepositWithdrawDone: tabBarModalRoutes.DepositWithdrawDone},
//   ),
//   SolarFarm: createStackNavigator(
//     {SolarFarm: tabBarModalRoutes.SolarFarm},
//   ),
// };

export const TabBarModalRootRoutes = () => {
  const tabBarModalRoutesKeys = Object.keys(tabBarModalRoutes);
  const allModalRoutes = {};
  tabBarModalRoutesKeys.forEach((modalRouteKey) => {
    const modalRoutesConfigValue = tabBarModalRoutes[modalRouteKey];
    const modalRoute = tabModalOptions(modalRoutesConfigValue);

    const stack = createStackNavigator(
      {
        [modalRouteKey]: modalRoutesConfigValue,
        // [modalRouteKey]: modalRoutesConfigValue,
      },
      {
        headerMode: 'float',
        mode: 'modal',
      },
    );

    allModalRoutes[modalRouteKey] = stack;
  });

  return allModalRoutes;
};


const TabBarModalRootRoutesHz = createBottomTabNavigator(
  {
    ...TabBarModalRootRoutes(),
    // hz: {
    //   screen: hz,
    // },
  },
  {
    headerMode: 'float',
        mode: 'modal',
        swipeEnabled: false,
    // ...tabBarOptions,
  },
);

const TabBarModal = createBottomTabNavigator(
  {
    hz: {
      screen: hz,
    },
  },
  {
    mode: 'modal',
    // headerMode: 'none',
    // ...tabModalOptions,
    ...tabBarOptions,
  },
);

const TabWithModal = createStackNavigator(
  {
    TabBar: {
      screen: TabBar,
    },
    // TabBarModal: {
    //   screen: TabBarModal,
    // },
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

export const TabSubStack = createStackNavigator(
  {
    TabBar: {
      screen: TabBar,
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

const TabBarModalRootStack = createBottomTabNavigator(
  tabBarModalRootRoutes,
  {
    mode: 'modal',
    headerMode: 'none',
    ...tabBarOptions,
    ...tabModalOptions,
  },
);

// const TabBarRootModalStack = createStackNavigator(
//   tabBarModalRootRoutes,
//   {
//     mode: 'modal',
//     // headerMode: 'float',
//   },
// );


export const TabStack = createStackNavigator(
  {
    TabSubStack: {
      screen: TabSubStack,
    },
    TabBarModalRootStack: {
      screen: TabBarModalRootStack,
    },
    // TabBarModal: {
    //   screen: TabBarModal,
    // },
    // ...TabBarModalRootRoutes(),
    TabBarModalRootRoutesHz: {
      screen: TabBarModalRootRoutesHz,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
