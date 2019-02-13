
import _ from 'lodash';

import {
  Home,
  Settings,
  Example,
} from 'src/Screens';

import {
  noHeader,
  drawerOptions,
} from './navigationOptions';

const drawerRoutes = {
  home: {
    title: '-',
    screen: Home,
    // params: {
    //   title: '--',
    //   noHeader: false,
    // },
  },
  example: {
    title: 'example',
    screen: Example,
  },
};

const drawerModalRoutes = {
  settings: {
    title: 'Settings',
    screen: Settings,
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
