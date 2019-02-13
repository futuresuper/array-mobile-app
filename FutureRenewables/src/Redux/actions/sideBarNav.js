
import {
  routePush,
} from './navigationCard';

export default function navigateTo(route, params = null) {
  return (dispatch, getState) => {

    dispatch(routePush(route, params));
  };
}
