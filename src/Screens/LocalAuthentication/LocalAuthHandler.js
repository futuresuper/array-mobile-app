import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { localAuthSelector } from 'src/Redux/Auth';

import {
  routeNames,
} from 'src/Navigation';

class LocalAuthHandler extends React.Component {
  componentDidMount() {
    const { localAuth, navigation, screenProps } = this.props;
    const next = navigation.getParam('next', '');

    if (localAuth.biometrics) {
      return screenProps.navigateTo(routeNames.BIOMETRICS_VALIDATION, { next });
    }
    if (localAuth.pin) {
      return screenProps.navigateTo(routeNames.PIN_VALIDATION, { next });
    }
    return screenProps.navigateTo(routeNames.PIN_SETUP, { next });
  }

  render() {
    return null;
  }
}

LocalAuthHandler.propTypes = {
  localAuth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const localAuth = localAuthSelector(state);
  return {
    localAuth,
  };
};

export default connect(mapStateToProps)(LocalAuthHandler);
