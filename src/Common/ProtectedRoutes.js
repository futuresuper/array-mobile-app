
import React from 'react';
import PropTypes from 'prop-types';
import {
  connect,
} from 'react-redux';

import {
  routeNames,
} from 'src/Navigation';

import {
  accountIdSelector,
} from 'src/Redux/Account';

import {
  localAuthSelector,
} from 'src/Redux/Auth';

import {
  navGetCurrentScreen,
} from 'src/Common/Helpers';

class ProtectedRoutes extends React.Component {
  componentDidUpdate(prevProps) {
    const { accountId, account, navState } = this.props;
    const { accountId: prevAccountId } = prevProps;
    const currentRoute = navGetCurrentScreen(navState);
    if (accountId !== prevAccountId) {
      console.log("ACCOUNT REDIRECT");
      this.accountRedirects(account);
    }
    if (currentRoute.params.protected) {
      console.log("VALIDATING PROTECTED ROUTE");
      // this.validateProtectedRoute(currentRoute);
    }
  }

  accountRedirects(account) {
    const { status } = account;
    if (status === 'awaitingIdCheckAndMoney' || status === 'awaitingIdCheck') {
      this.navigateToRoute(routeNames.ID_CHECK);
    } else {
      this.navigateToRoute(routeNames.TAB_HOME);
    }
  }

  validateProtectedRoute(route) {
    const { localAuth } = this.props;
    if (localAuth.expires_in < Math.floor(Date.now() / 1000)) {
      this.navigateToRoute(routeNames.LOCAL_AUTH_HANDLER, {
        next: route.routeName,
      });
    }
  }

  navigateToRoute(route, params) {
    const { navigateTo } = this.props;
    navigateTo(route, params);
  }

  render() {
    return null;
  }
}

ProtectedRoutes.defaultProps = {
  accountId: '',
};

ProtectedRoutes.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  accountId: PropTypes.string,
  localAuth: PropTypes.object.isRequired,
  navState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const accountId = accountIdSelector(state);
  const localAuth = localAuthSelector(state);
  return {
    accountId,
    localAuth,
  };
};


export default connect(mapStateToProps)(ProtectedRoutes);
