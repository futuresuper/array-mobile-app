
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

class ProtectedRoutes extends React.Component {
  componentDidUpdate(prevProps) {
    const { accountId, account } = this.props;
    const { accountId: prevAccountId } = prevProps;
    if (accountId !== prevAccountId  && account.status !== "incompleteApp") {
      this.accountRedirects(account);
    }
  }

  accountRedirects(account) {
    const { status } = account;
    if (status === 'awaitingIdCheckAndMoney' || status === 'awaitingIdCheck') {
      this.navigateToRoute(routeNames.PIN_SETUP);
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

ProtectedRoutes.defaultProps = {
  accountId: '',
};

ProtectedRoutes.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  accountId: PropTypes.string,
};

const mapStateToProps = (state) => {
  const accountId = accountIdSelector(state);
  return {
    accountId,
  };
};


export default connect(mapStateToProps)(ProtectedRoutes);
