import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import {
  Content,
  Button,
  Text,
} from 'native-base';


import {
  routeNames,
} from 'src/Navigation';
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
  }

  handleOpenBiometrics() {
    this.setState(prevState => ({ biometrics: !prevState.biometrics }));
  }

  handleBiometricsSuccess() {

  }

  handleBiometricsError(error) {

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
              <Button onPress={() => this.openBiometrics()} block>
                <Text>
                  {biometrics ? 'Disable' : 'Enable'}
                  {' Face/Touch ID'}
                </Text>
              </Button>
            </View>
            {biometrics && (
            <View style={[styleGlobal.center, styleGlobal.mT50]}>
              <BiometricsInput onSuccess={() => this.handleBiometricsSuccess()} onError={error => this.handleBiometricsError(error)} />
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

const res = composeHoc([
  hocNames.FORM,
])(BiometricsSetup);

export default connect()(res);
