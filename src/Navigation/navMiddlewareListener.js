/* eslint-disable import/prefer-default-export */
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const navReduxMiddleware = createReactNavigationReduxMiddleware(
  (state) => state.navigationCard,
);

export {
  navReduxMiddleware,
};
