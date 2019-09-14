
import React from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';

import {
  routeNames,
} from 'src/Navigation';


class ProtectedRoutes extends React.Component {
  componentDidUpdate(prevProps) {
    const { account } = this.props;
    const { account: prevAccount } = prevProps;
    if (account.id !== prevAccount.id) {
      if (account.completed) {
        this.navigateToRoute(routeNames.TAB_HOME);
      } else {
        this.navigateToRoute(routeNames.NAME);
      }
    }
  }

  navigateToRoute(route) {
    const { navigateTo } = this.props;
    navigateTo(route);
  }

  render() {
    return null;
  }
}

ProtectedRoutes.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
};


export default connect()(ProtectedRoutes);
