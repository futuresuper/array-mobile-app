import React from 'react';
import PropTypes from 'prop-types';
import { AlertIOS } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

class FingerprintInput extends React.Component {
  componentDidMount() {
    const { onSuccess, onError } = this.props;
    FingerprintScanner
      .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
      .then(() => {
        onSuccess();
        AlertIOS.alert('Authenticated successfully');
      })
      .catch((error) => {
        onError(error);
        AlertIOS.alert(error.message);
      });
  }

  render() {
    return false;
  }
}

FingerprintInput.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default FingerprintInput;
