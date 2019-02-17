
import {
  createStackNavigator,
} from 'react-navigation';

import {
  signRoutes,
  mainRoutes,
  mainModalRoutes,
} from './routes';

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
