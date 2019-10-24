
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Image,
} from 'react-native';

import {
  Content,
  Text,
  Button,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import {
  sg,
} from 'src/Styles';
import SafeAreaView from 'src/Components/SafeAreaView';

import buildYourSaving from './images/buildYourSaving.png';
import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class BuildYourSaving extends Component {
  render() {
    const { screenProps } = this.props;

    return (
      <SafeAreaView themeMode={screenProps.themeMode} forceInset={{ top: 'never' }}>

        <Content contentContainerStyle={sg.flexGrow} bounces={false}>
          <View style={[sg.spaceBetween]}>

            <View>
              <Text style={[styles.header, sg.mB10, sg.mT60]}>
                {'Build your\nsavings'}
              </Text>

              <Text style={[sg.colorDark2, sg.textCenter]}>
                {'With a target return of 5.2%^, you can\nwatch your money grow'}
              </Text>

            </View>

            <Image source={buildYourSaving} />

            <Text style={[sg.contentMarginH, sg.fS11, sg.colorDark3alpha, sg.textCenter]}>
            ^ Target Return is after fees and expenses and including distributions. The Fund Manager has a reasonable basis for setting the target return,
            however it is a ‘target’ only.  It is not intended as a projection of likely future returns and is not a guarantee.
            The value of your investment can rise and fall. Please refer to the PDS for further information.
            </Text>

            <Button
              style={[sg.contentMargin, sg.mT5]}
              block
              onPress={() => {
                screenProps.navigateTo(routeNames.BUILD_YOUR_IMPACT);
              }}
            >
              <Text>Next</Text>
            </Button>
          </View>

        </Content>
      </SafeAreaView>
    );
  }
}

export default connect()(BuildYourSaving);
