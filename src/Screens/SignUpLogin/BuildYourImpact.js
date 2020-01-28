import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View, Image, FlatList, ImageBackground,
} from 'react-native';

import {
  Text,
  Button,
  Icon,
  View as ViewNB,
} from 'native-base';

import { routeNames } from 'src/Navigation';

import SafeAreaView from 'src/Components/SafeAreaView';

import { sg, sc } from 'src/Styles';

import Brigalow from 'src/assets/images/farms/Brigalow.png';
import Chinchilla from 'src/assets/images/farms/Chinchilla.png';
import SwanHill from 'src/assets/images/farms/SwanHill.png';
// import SwanHill2 from 'src/assets/images/farms/SwanHill2.png';
import BackButton from 'src/Components/BackButton';

import buildYourImpact from './images/buildYourImpact.png';
import styles from './styles';

class BuildYourImpact extends Component {
  static navigationOptions = () => ({
    header: null,
  })

  renderFarms() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={[Brigalow, Chinchilla, SwanHill]}
        renderItem={(item) => {
          if (item.index === 0) {
            return (
              <View style={[sg.farmImageShadow, sg.m15]}>
                <ImageBackground
                  source={item.item}
                  imageStyle={{ borderRadius: 10 }}
                  style={[sg.farmImage, {
                    justifyContent: 'space-between',
                    padding: 14,
                    height: 240 * 0.8,
                    width: 316 * 0.8,
                  }]}
                >
                  <View>
                    <Text style={[sg.fS18, sg.colorDark2, sg.textBold]}>Brigalow</Text>
                    <Text style={[sg.fS15, sg.colorDark3, sg.mT5]}>Queensland</Text>
                  </View>
                  <View style={[sg.row, sg.aICenter]}>
                    <Icon
                      type="FontAwesome5"
                      name="wrench"
                      style={{ color: sc.color.primary, fontSize: 22 }}
                    />
                    <Text style={[sg.colorWhite, sg.fS12, sg.fontMedium, sg.mL15]}>
                      {'Being built right now\nDue for completion in December'}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            );
          }
          return (
            <View style={[sg.farmImageShadow, sg.mR15]}>
              <Image source={item.item} style={[sg.farmImage, { height: 240 * 0.8, width: 316 * 0.8 }]} />
            </View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[sg.flexGrowNull, sg.mT20]}
      />
    );
  }

  render() {
    const { screenProps } = this.props;

    return (
      <SafeAreaView themeMode={screenProps.themeMode}>
        <Image source={buildYourImpact} style={[sg.postitionAbsolute]} />
        <BackButton
          signup
          header={false}
          style={sg.pL30}
          iconStyle={sg.mL0}
          {...this.props}
        />

        <ViewNB style={[sg.spaceBetween, sg.contentPaddingH]}>
          <View style={sg.mT50}>
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
        </ViewNB>
      </SafeAreaView>
    );
  }
}

export default connect()(BuildYourImpact);
