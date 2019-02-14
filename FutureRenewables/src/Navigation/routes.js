
import _ from 'lodash';

import {
  Home,
  SignUpLogin,
  Settings,
  Example,
} from 'src/Screens';

import {
  noHeader,
  drawerOptions,
} from './navigationOptions';

const drawerRoutes = {
  home: {
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
  settings: {
    screen: Settings,
  },
};

const drawerModalRoutes = {
  example: {
    screen: Example,
  },
};

Object.keys(drawerRoutes).forEach((key) => {
  const item = drawerRoutes[key];
  const { params } = item;
  let navigationOptions;

  if (params && !_.isNil(params.noHeader) && params.noHeader) {
    navigationOptions = noHeader;
  } else {
    navigationOptions = drawerOptions;
  }

  drawerRoutes[key].navigationOptions = navigationOptions;
});

export {
  drawerRoutes,
  drawerModalRoutes,
};
