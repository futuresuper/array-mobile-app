import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View, Image, FlatList, ImageBackground, TouchableOpacity,
} from 'react-native';
import { Content, Text } from 'native-base';

import WeatherWidget from 'src/Components/WeatherWidget';
import CircularProgress from 'src/Components/CircularProgress';
import routeNames from 'src/Navigation/routeNames';

import { solarFarmsSelector } from 'src/Redux/AppContent';

import { sg, sc } from 'src/Styles';

import MarkerActive from 'src/assets/images/MarkerActive.png';

import { farmsList as styles } from './styles';

class SolarFarmsList extends Component {
  renderFarmCard({ item }) {
    const { screenProps } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          screenProps.navigateTo(routeNames.SOLAR_FARM, { item });
        }}
      >
        <ImageBackground
          source={{ uri: item.featureImage.landscape }}
          resizeMode="stretch"
          style={styles.farmImage}
        >
          <View style={styles.farmTextBl}>
            <View>
              <Text style={[sg.fS20, sg.colorDark2, sg.textBold]}>{item.name}</Text>
              <Text style={[sg.fontMedium, sg.colorDark3, sg.mT5]}>{item.location}</Text>
            </View>

            <WeatherWidget coordinate={item.coordinate} showSummary={false} />
          </View>

          {item.percentComplete < 100 && (
            <View style={[sg.row, sg.aICenter]}>
              <CircularProgress
                progress={item.percentComplete / 100}
                borderWidth={1}
                size={18}
                color={sc.color.primary}
                borderColor={sc.color.gray6}
              />
              <Text style={[sg.colorWhite, sg.fS14, sg.fontMedium, sg.mL15]}>
                {`${item.percentComplete}% Completed`}
              </Text>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  render() {
    const { screenProps, farms } = this.props;
    console.log('----------farms', farms);
    return (
      <Content padder>
        <View style={[sg.aICenter, sg.mB20]}>
          <Text style={[sg.fS24, sg.textBold]} color2>
            {'Explore your\n Solar Farms'}
          </Text>

          <TouchableOpacity
            style={styles.markerImageContainer}
            onPress={() => {
              screenProps.navigateTo(routeNames.SOLAR_FARMS_MAP);
            }}
          >
            <Image source={MarkerActive} style={styles.markerImage} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={farms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(...args) => this.renderFarmCard(...args)}
        />
      </Content>
    );
  }
}

SolarFarmsList.propTypes = {
  farms: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const solarFarms = solarFarmsSelector(state);

  return {
    farms: solarFarms,
  };
};

export default connect(mapStateToProps)(SolarFarmsList);
