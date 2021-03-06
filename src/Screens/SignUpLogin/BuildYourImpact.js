import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Image, FlatList } from 'react-native';

import { Content, Text, Button } from 'native-base';

import { routeNames } from 'src/Navigation';

import SafeAreaView from 'src/Components/SafeAreaView';
import BackButton from 'src/Components/BackButton';

import { sg } from 'src/Styles';

import Brigalow from 'src/assets/images/farms/Brigalow.png';
import Chinchilla from 'src/assets/images/farms/Chinchilla.png';
import SwanHill from 'src/assets/images/farms/SwanHill.png';
// import SwanHill2 from 'src/assets/images/farms/SwanHill2.png';

import buildYourImpact from './images/buildYourImpact.png';
import styles from './styles';

class BuildYourImpact extends Component {
  renderFarms() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={[Brigalow, Chinchilla, SwanHill]}
        renderItem={({ item }) => (
          <View style={[sg.farmImageShadow, sg.mR15]}>
            <Image source={item} style={[sg.farmImage, { height: 240 * 0.8, width: 316 * 0.8 }]} />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[sg.flexGrowNull, sg.mT20]}
      />
    );
  }

  render() {
    const { screenProps } = this.props;

    return (
      <SafeAreaView themeMode={screenProps.themeMode} forceInset={{ top: 'never' }}>
        <Content contentContainerStyle={[sg.flexGrow]} bounces={false}>
          <Image source={buildYourImpact} style={[sg.postitionAbsolute, sg.aSCenter]} />

          <SafeAreaView forceInset={{ bottom: 'never' }} themeMode={screenProps.themeMode}>
            <View style={[sg.spaceBetween, sg.contentPaddingH]}>
              <View>
                <Text style={[styles.header, sg.mB10]}>
                  {'Build your\nimpact'}
                </Text>
                <Text style={sg.textCenter}>
                  {'Put your savings to work building &\nsupporting real solar farms, like these'}
                </Text>
              </View>

              {this.renderFarms()}

              <Button
                style={[sg.mH0, sg.contentMarginV]}
                block
                onPress={() => {
                  screenProps.navigateTo(routeNames.SIGN_UP_LOGIN);
                }}
              >
                <Text>Next</Text>
              </Button>
            </View>
          </SafeAreaView>
        </Content>
      </SafeAreaView>
    );
  }
}

export default connect()(BuildYourImpact);
