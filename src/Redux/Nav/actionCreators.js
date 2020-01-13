
import {
  getRouteInfo,
} from 'src/Navigation/routes';
import amplitude from 'amplitude-js';

export function routePush(route, params = null) {
  amplitude.getInstance().logEvent(`Viewed ${route} screen`, {});
  return {
    type: 'ROUTE_PUSH',
    route_name: route,
    params,
  };
}

export function routeBack(back_screen = null, params = null) {
  return {
    type: 'ROUTE_BACK',
    payload: {
      back_screen,
      params,
    },
  };
}

export function routeReset(route, params = {}, key) {
  return {
    type: 'ROUTE_RESET',
    route_name: route,
    params,
    key,
  };
}

export function navigateTo(route, paramsInp = {}) {
  return (dispatch) => {
    const routeInfo = getRouteInfo(route);
    const params = (routeInfo && routeInfo.params) ? { ...routeInfo.params, ...paramsInp } : paramsInp;

    dispatch(routePush(route, params));

    if (
      params.routeReset
    ) {
      dispatch(routeReset(route, params));
    }
  };
}
