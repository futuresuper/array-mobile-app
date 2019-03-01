
import { AppNavigator } from 'src/Navigation/AppNavigator';
import { NavigationActions, StackActions } from 'react-navigation';
import _ from 'lodash';

export default function (state, action) {
  let res;

  switch (action.type) {
    case 'ROUTE_PUSH': {
      res = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: action.route_name, params: action.params }), state);

      return res;
    }
    case 'ROUTE_RESET': {
      res = AppNavigator.router.getStateForAction(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: action.route_name }),
        ],
      }), state);

      return res;
    }
    case 'ROUTE_BACK': {
      let navBack;
      const { back_screen, params } = action.payload;

      if (!_.isNil(back_screen)) {
        navBack = NavigationActions.navigate({
          routeName: back_screen,
          params: { ...params },
        });
      } else {
        navBack = NavigationActions.back();
      }

      res = AppNavigator.router.getStateForAction(navBack, state);

      return res;
    }
    default: {
      res = AppNavigator.router.getStateForAction(action, state);

      return res;
    }
  }
}
