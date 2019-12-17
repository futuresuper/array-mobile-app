import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View, Image, FlatList, ImageBackground, TouchableOpacity,
} from 'react-native';
import {
  Content, Text, Icon, Button,
} from 'native-base';

import WeatherWidget from 'src/Components/WeatherWidget';
import { CircularProgress } from 'react-native-circular-progress';
import routeNames from 'src/Navigation/routeNames';

import { solarFarmsSelector } from 'src/Redux/AppContent';

import { sg, sc } from 'src/Styles';

import MarkerActive from 'src/assets/images/MarkerActive.png';
import SolarFarmsMap from './SolarFarmsMap';

import { farmsList as styles } from './styles';

class SolarFarmsList extends Component {
  state = {
    preview: {
      isList: true,
      isMap: false,
    },
  }

  setMapPreview() {
    this.setState({
      preview: {
        isList: false,
        isMap: true,
      },
    });
  }

  setListPreview() {
    this.setState({
      preview: {
        isList: true,
        isMap: false,
      },
    });
  }

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

          {item.name === 'Brigalow' && (
            <View style={[sg.row, sg.aICenter]}>
              <Icon
                type="FontAwesome5"
                name="wrench"
                style={{ color: sc.color.primary }}
                size={20}
              />
              <Text style={[sg.colorWhite, sg.fS14, sg.fontMedium, sg.mL15, { flex: 0.8, flexWrap: 'wrap' }]}>
                {`${item.statusDescription1}\n${item.statusDescription2}`}
              </Text>
            </View>
          )}

          {item.name !== 'Brigalow' && item.percentComplete < 100 && (
            <View style={[sg.row, sg.aICenter]}>
              <CircularProgress
                fill={item.percentComplete}
                size={18}
                rotation={360}
                width={3}
                backgroundWidth={1}
                backgroundColor={sc.color.gray6}
                tintColor={sc.color.primary}
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
    const { farms, screenProps } = this.props;
    const { preview } = this.state;
    console.log('----------farms', farms);
    return (
      <Content padder>
        <View style={[sg.aICenter, sg.mB20]}>
          <Text style={[sg.fS24, sg.textBold]} color2>
            {'Your Solar Farms'}
          </Text>
        </View>

        <View style={[sg.mH20, sg.row]}>
          <Button
            transparent
            onPress={() => this.setListPreview()}
            style={[
              styles.activityTabTitleBl,
              sg.flex05,
              preview.isList ? styles.activityTabTitleBlActive : {},
            ]}
          >
            <Text
              style={[
                styles.activityTabTitleTextActive,
                !preview.isList ? styles.activityTabTitleText : {},
              ]}
            >
              List
            </Text>
          </Button>
          <Button
            transparent
            onPress={() => this.setMapPreview()}
            style={[
              styles.activityTabTitleBl,
              sg.flex05,
              preview.isMap ? styles.activityTabTitleBlActive : {},
            ]}
          >
            <Image source={MarkerActive} style={styles.markerImage} />
            <Text
              style={[
                styles.activityTabTitleTextActive,
                sg.textCenter,
                !preview.isMap ? styles.activityTabTitleText : {},
              ]}
            >
              {' Map'}
            </Text>
          </Button>
        </View>
        <View>
          {preview.isList && (
          <FlatList
            data={farms}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(...args) => this.renderFarmCard(...args)}
          />
          )}
          {preview.isMap && (
          <View style={{ height: 450, marginHorizontal: -30 }}>
            <SolarFarmsMap screenProps={screenProps} />
          </View>
          )}
        </View>
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
