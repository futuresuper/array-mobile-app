
import _ from 'lodash';

import {
  Home,
  SignUpLogin,
  SmsCode,
  AccountsApplications,
  Feed,
  ApplicationType,
  Name,
  Email,
  DateOfBirth,
  HomeAddress,
  InitialInvestmentAmount,
  RegularInvestmentAmount,
  BankAccount,
  DirectDebitAuth,
  Example,
} from 'src/Screens';

import {
  noHeader,
  drawerOptions,
} from './navigationOptions';

const formatRoutes = (routesInp) => {
  const routes = routesInp;

  Object.keys(routes).forEach((key) => {
    const item = routes[key];
    const { params } = item;
    let navigationOptions;

    if (params && !_.isNil(params.noHeader) && params.noHeader) {
      navigationOptions = noHeader;
    } else {
      navigationOptions = drawerOptions;
    }

    routes[key].navigationOptions = navigationOptions;
  });

  return routes;
};

const signRoutes = formatRoutes({
  Home: {
    screen: Home,
    params: {
      noHeader: true,
    },
  },
  SignUpLogin: {
    screen: SignUpLogin,
    params: {
      title: 'Sign Up or Login',
    },
  },
  SmsCode: {
    screen: SmsCode,
    params: {
      title: 'SMS code',
    },
  },
});

const mainRoutes = formatRoutes({
  AccountsApplications: {
    screen: AccountsApplications,
    params: {
      title: 'Accounts and Applications',
    },
  },
  Feed: {
    screen: Feed,
    params: {
      noHeader: true,
    },
  },
  ApplicationType: {
    screen: ApplicationType,
    params: {
      routeReset: true,
    },
  },
  Name: {
    screen: Name,
  },
  Email: {
    screen: Email,
  },
  DateOfBirth: {
    screen: DateOfBirth,
  },
  HomeAddress: {
    screen: HomeAddress,
  },
  InitialInvestmentAmount: {
    screen: InitialInvestmentAmount,
  },
  RegularInvestmentAmount: {
    screen: RegularInvestmentAmount,
  },
  BankAccount: {
    screen: BankAccount,
  },
  DirectDebitAuth: {
    screen: DirectDebitAuth,
  },
});

const mainModalRoutes = {
  example: {
    screen: Example,
  },
};

const routes = {
  signRoutes,
  mainRoutes,
  mainModalRoutes,
};

const getRouteInfo = (findScreenKey) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const keyRoute in routes) {
    if ({}.hasOwnProperty.call(routes, keyRoute)) {
      const routeInfo = routes[keyRoute];

      // eslint-disable-next-line no-restricted-syntax
      for (const keyScreen in routeInfo) {
        if ({}.hasOwnProperty.call(routeInfo, keyScreen)) {
          let screenInfo = routeInfo[keyScreen];

          if (findScreenKey === keyScreen) {
            screenInfo = _.omit(screenInfo, ['screen', 'navigationOptions']);
            if (!screenInfo.params) screenInfo.params = {};

            return screenInfo;
          }
        }
      }
    }
  }

  return null;
};

export {
  routes,
  getRouteInfo,
  signRoutes,
  mainRoutes,
  mainModalRoutes,
};
