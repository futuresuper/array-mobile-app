
function getCurrentRoute(state, topLevel = false) {
  let route = state;

  if (topLevel) {
    if (route.routes) {
      route = route.routes[route.index];
    }
  } else {
    while (route.routes) {
      route = route.routes[route.index];
    }
  }

  return route;
}

export default {
  getCurrentRoute,
};
