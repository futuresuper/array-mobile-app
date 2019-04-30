
import {
  getRouteInfo,
} from 'src/Navigation/routes';

export function routePush(route, params = null) {
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

export function routeReset(route, params = {}) {
  return {
    type: 'ROUTE_RESET',
    route_name: route,
    params,
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
