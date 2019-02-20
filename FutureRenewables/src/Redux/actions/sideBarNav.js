
import {
  getRouteInfo,
} from 'src/Navigation/routes';

import {
  routePush,
  routeReset,
} from './navigationCard';

export default function navigateTo(route, paramsInp = {}) {
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
