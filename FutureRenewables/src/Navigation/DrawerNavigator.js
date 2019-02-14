
import {
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import {
  isIOS,
} from 'src/Common/Helpers';

import {
  drawerRoutes,
  drawerModalRoutes,
} from './routes';

const DrawerModalStack = createStackNavigator(
  drawerModalRoutes,
  {
    mode: 'card',
    headerMode: 'float',
  },
);

const DrawerStack = createStackNavigator(
  drawerRoutes,
  {
    headerMode: 'float',
  },
);

const DrawerRoutes = createStackNavigator(
  {
    DrawerStack,
    DrawerModalStack,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const DrawerNavigation = createDrawerNavigator(
  {
    DrawerRoutes,
  },
  {
    // contentComponent: SideMenu,
    drawerLockMode: isIOS() ? 'locked-closed' : null,
  },
);

// const DrawerNavigation = DrawerRoutes;

export default DrawerNavigation;
