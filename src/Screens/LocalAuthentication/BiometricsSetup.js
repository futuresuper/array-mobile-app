import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
} from 'native-base';

import { biometricsSave } from 'src/Redux/Auth';

import {
  composeHoc,
  hocNames,
} from 'src/Common/Hocs';

import KeyboardAvoidingView from 'src/Components/KeyboardAvoidingView';
import BiometricsInput from 'src/Components/BiometricsInput';


import {
  styleGlobal,
} from 'src/Styles';

class BiometricsSetup extends React.Component {
  state = {
    biometrics: false,
  }

  handleSkip() {
    const { screenProps, navigation } = this.props;
    const next = navigation.getParam('next', 'TAB_HOME');

    screenProps.navigateTo(next);
  }

  handleOpenBiometrics() {
    this.setState((prevState) => ({ biometrics: !prevState.biometrics }));
  }

  handleBiometricsSuccess() {
    const { biometricsSaveConnect, screenProps, navigation } = this.props;
    const next = navigation.getParam('next', 'TAB_HOME');
    biometricsSaveConnect(true);
    screenProps.navigateTo(next);
  }

  handleBiometricsError(error) {
    alert(error);
  }

  render() {
    const { biometrics } = this.state;
    return (
      <Content padder contentContainerStyle={styleGlobal.flexGrow}>
        <View style={styleGlobal.spaceBetween}>
          <View>
            <View>
              <Text style={[styleGlobal.formHeading, styleGlobal.mB10]}>
                Set up your security
              </Text>
              <Text>
                Your PIN is set. You can also use Face/Touch ID for future log ins:
              </Text>
            </View>
            <View style={[styleGlobal.center, styleGlobal.mT50]}>
              <Button onPress={() => this.handleOpenBiometrics()} block>
                <Text>
                  {biometrics ? 'Disable' : 'Enable'}
                  {' Face/Touch ID'}
                </Text>
              </Button>
            </View>
            {biometrics && (
            <View style={[styleGlobal.center, styleGlobal.mT50]}>
              <BiometricsInput onSuccess={() => this.handleBiometricsSuccess()} onError={(error) => this.handleBiometricsError(error)} />
            </View>
            )}
          </View>

          {!biometrics && (
          <KeyboardAvoidingView keyboardVerticalOffset={100}>
            <Button
              bordered
              dark
              block
              marginVert
              onPress={() => this.handleSkip()}
            >
              <Text>Next</Text>
            </Button>
          </KeyboardAvoidingView>
          )}
        </View>
      </Content>
    );
  }
}

BiometricsSetup.propTypes = {
  biometricsSaveConnect: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  biometricsSaveConnect: biometricsSave,
};

const res = composeHoc([
  hocNames.FORM,
])(BiometricsSetup);

export default connect(mapStateToProps, mapDispatchToProps)(res);
