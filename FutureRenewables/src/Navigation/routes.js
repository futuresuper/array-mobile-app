
import _ from 'lodash';

import {
  Home,
  SignUpLogin,
  SmsCode,
  AccountsApplications,
  Feed,
  ApplicationType,
  Name,
  HomeAddress,
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
  },
  Name: {
    screen: Name,
  },
  HomeAddress: {
    screen: HomeAddress,
  },
});

const mainModalRoutes = {
  example: {
    screen: Example,
  },
};

export {
  signRoutes,
  mainRoutes,
  mainModalRoutes,
};
