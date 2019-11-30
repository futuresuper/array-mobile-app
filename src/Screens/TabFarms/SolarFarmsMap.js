
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View,
  FlatList,
  Image,
} from 'react-native';

import { isNil } from 'lodash';

import {
  Text,
  H3,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Thumbnail,
} from 'native-base';

import MapView from 'react-native-maps';

import {
  routeNames,
} from 'src/Navigation';
import { CircularProgress } from 'react-native-circular-progress';

import BackButton from 'src/Components/BackButton';
import DeviceUtils from 'src/Common/device';

import {
  solarFarmsSelector,
} from 'src/Redux/AppContent';

import MarkerActive from 'src/assets/images/MarkerActive.png';
import MarkerInactive from 'src/assets/images/MarkerInactive.png';

import {
  sg,
  sc,
} from 'src/Styles';

import styles from './styles';

class TabFarms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMapReady: false,
      startPosition: null,
      activeFarmId: null,
    };
  }

  getRegionForCoordinates() {
    let minX,
      maxX,
      minY,
      maxY,
      activeFarmId;
    const { farms } = this.props;

    if (!farms.length) {
      return;
    }

    // init first farm
    ((farm) => {
      minX = farm.coordinate.latitude;
      maxX = farm.coordinate.latitude;
      minY = farm.coordinate.longitude;
      maxY = farm.coordinate.longitude;
      activeFarmId = farm.id;
    })(farms[0]);

    // calculate rect
    farms.map((farm) => {
      minX = Math.min(minX, farm.coordinate.latitude);
      maxX = Math.max(maxX, farm.coordinate.latitude);
      minY = Math.min(minY, farm.coordinate.longitude);
      maxY = Math.max(maxY, farm.coordinate.longitude);

      return null;
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;

    const deltaX = (maxX - minX) + 10;
    const deltaY = (maxY - minY) + 5;

    this.setState({
      startPosition: {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltaX,
        longitudeDelta: deltaY,
      },
      activeFarmId,
    });
  }

  activateFarm = (item) => {
    const zoomFactor = 5000;
    const deltaVal = 0.00522;
    const latitudeDelta = deltaVal * zoomFactor;
    const longitudeDelta = deltaVal * DeviceUtils.screenAspectRatio() * zoomFactor;

    this._mapView.animateToRegion({
      ...item.coordinate,
      latitudeDelta,
      longitudeDelta,
    });

    if (this.activeFarmTimeoutId) {
      clearTimeout(this.activeFarmTimeoutId);
    }
    this.activeFarmTimeoutId = setTimeout(() => {
      this.setState({
        startPosition: {
          ...item.coordinate,
          latitudeDelta,
          longitudeDelta,
        },
        activeFarmId: item.id,
      });
    }, 500);
  }

  onMapReady = () => {
    this.setState({
      isMapReady: true,
    }, () => {
      const { farms } = this.props;
      this.activateFarm(farms[0]);
    });
  }

  navigateToFarm(item) {
    const { screenProps } = this.props;

    screenProps.navigateTo(routeNames.SOLAR_FARM, { item });
  }

  renderMarker = (item) => {
    const { activeFarmId } = this.state;
    let markerImage = MarkerInactive;
    let style = {};
    if (activeFarmId === item.id) {
      markerImage = MarkerActive;
      style = styles.markerIconActive;
    }

    return (
      <View style={[sg.center]}>
        <Image source={markerImage} style={[styles.markerIconMain, styles.markerIcon, style]} />
        <Text style={[styles.marketTitle]}>{item.title}</Text>
      </View>
    );
  }

  renderFarmCard({ item }) {
    return (
      <Card style={styles.farmCardBl}>
        <CardItem
          button
          onPress={() => {
            this.navigateToFarm(item);
          }}
          style={styles.farmCardItem}
        >
          <Left>
            <Thumbnail
              resizeMode="cover"
              source={{ uri: item.featureImage.landscape }}
              style={styles.farmCardImage}
            />
          </Left>
          <Body style={styles.farmCardBody}>
            <View>
              <H3 style={[sg.fS20]} color2>{item.name}</H3>
              <Text style={styles.farmCardTextDescription}>{item.location}</Text>
            </View>
            <Text style={styles.farmCardTextComplete}>
              {item.percentComplete}
              % Completed
            </Text>
          </Body>
          <Right style={styles.farmCardRight}>
            <CircularProgress
              fill={item.percentComplete}
              size={24}
              rotation={360}
              width={3}
              backgroundWidth={1}
              backgroundColor={sc.color.gray6}
              tintColor={sc.color.primary}
            />
          </Right>
        </CardItem>
      </Card>
    );
  }

  render() {
    const { farms } = this.props;
    const { startPosition, isMapReady } = this.state;

    return (
      <View style={sg.flex}>
        <MapView
          ref={(ref) => {
            if (ref) this._mapView = ref;
          }}
          style={sg.absoluteFillObject}
          region={startPosition}
          onMapReady={this.onMapReady}
        >
          {isMapReady && farms.map((item, index) => (
            <MapView.Marker
              key={index.toString()}
              coordinate={item.coordinate}
              onPress={() => {
                this.navigateToFarm(item);
              }}
            >
              {this.renderMarker(item)}
            </MapView.Marker>
          ))}
        </MapView>
        <View style={styles.farmCardsBl}>
          <FlatList
            ref={(c) => {
              if (c) this.farmsFlarList = c;
            }}
            data={farms}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(...args) => this.renderFarmCard(...args)}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScrollEndDrag={(e) => {
              const currentOffset = e.nativeEvent.contentOffset.x;
              const direction = currentOffset > this.offset ? 'left' : 'right';
              const maxIndex = farms.length - 1;
              let nextIndex = 0;

              this.offset = currentOffset;
              this.currentIndex = isNil(this.currentIndex) ? 0 : this.currentIndex;

              if (direction === 'left') {
                if (this.currentIndex >= maxIndex) {
                  nextIndex = maxIndex;
                } else {
                  nextIndex = this.currentIndex + 1;
                }
              } else {
                // eslint-disable-next-line no-lonely-if
                if (this.currentIndex <= 0) {
                  nextIndex = 0;
                } else {
                  nextIndex = this.currentIndex - 1;
                }
              }

              if (this.currentIndex !== nextIndex) {
                this.currentIndex = nextIndex;

                this.activateFarm(farms[nextIndex]);
                this.farmsFlarList.scrollToIndex({ index: nextIndex });
              }
            }}
            onScrollBeginDrag={(e) => {
              this.offset = e.nativeEvent.contentOffset.x;
            }}
          />
        </View>
      </View>
    );
  }
}

TabFarms.propTypes = {
  farms: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const solarFarms = solarFarmsSelector(state);

  return {
    farms: solarFarms,
  };
};

export default connect(mapStateToProps)(TabFarms);
