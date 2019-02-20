
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

export function routeReset(route, params = null) {
  return {
    type: 'ROUTE_RESET',
    route_name: route,
    params,
  };
}
