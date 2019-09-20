import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  Icon,
} from 'native-base';

import FingerprintScanner from 'react-native-fingerprint-scanner';


import {
  sg,
} from 'src/Styles';

class BiometricsInput extends React.Component {
  state = {
    message: undefined,
  };

  componentDidMount() {
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(() => {
        this.setState({ message: 'Authenticated successfully' });
      })
      .catch((error) => {
        this.setState({ message: error.message });
      });
  }

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = (error) => {
    this.setState({ message: error.message });
  };


  render() {
    const { message } = this.state;
    return (
      <View style={[sg.borderedContainer, sg.flexGrow, sg.center, sg.bGWhite, sg.p20]}>
        <Icon
          fontSize={24}
          type="Ionicons"
          name="ios-finger-print"
        />
        <Text style={[sg.textBold, sg.fS18, sg.colorDark]}>
          {'Fingerprint Authentication'}
        </Text>
        <Text style={sg.textDescription}>
          {message || 'Scan your fingerprint on the device scanner to continue'}
        </Text>
      </View>
    );
  }
}

export default BiometricsInput;
