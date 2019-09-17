
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
      this.redirects(account);
    }
  }

  redirects(account) {
    const { status } = account;
    if (status === 'awaitingIdCheckAndMoney' || status === 'awaitingIdCheck') {
      this.navigateToRoute(routeNames.ID_CHECK);
    } else {
      this.navigateToRoute(routeNames.TAB_HOME);
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
