
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  FlatList,
  Image,
} from 'react-native';

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
import CircularProgress from 'src/Components/CircularProgress';
import BackButton from 'src/Components/BackButton';

import solarHeart from 'src/assets/images/solarHeart.png';
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
      farms: [
      ],
      startPosition: null,
      activeFarmId: null,
    };
  }

  componentDidMount() {
    this.getRegionForCoordinates();
  }

  getRegionForCoordinates() {
    let minX,
      maxX,
      minY,
      maxY,
      activeFarmId;
    const { farms } = this.state;

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
    this._mapView.animateToRegion({
      ...item.coordinate,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    if (this.activeFarmTimeoutId) {
      clearTimeout(this.activeFarmTimeoutId);
    }
    this.activeFarmTimeoutId = setTimeout(() => {
      this.setState({
        startPosition: {
          ...item.coordinate,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        activeFarmId: item.id,
      });
    }, 500);
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
      <View style={sg.center}>
        <Image source={markerImage} style={[styles.markerIcon, style]} />
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
              source={solarHeart}
              style={styles.farmCardImage}
            />
          </Left>
          <Body style={styles.farmCardBody}>
            <View>
              <H3 style={[sg.colorDark2, sg.fS20]}>{item.title}</H3>
              <Text style={styles.farmCardTextDescription}>{item.description}</Text>
            </View>
            <Text style={styles.farmCardTextComplete}>
              {item.completed}
              % Completed
            </Text>
          </Body>
          <Right style={styles.farmCardRight}>
            <CircularProgress
              percent={item.completed}
              radius={15}
              borderWidth={3}
              color={sc.color.primary}
              shadowColor={sc.color.gray15}
              bgColor={sc.color.white}
            />
          </Right>
        </CardItem>
      </Card>
    );
  }

  render() {
    const { farms, startPosition } = this.state;

    return (
      <View style={sg.flex}>
        <MapView
          ref={(ref) => {
            if (ref) this._mapView = ref;
          }}
          style={sg.absoluteFillObject}
          region={startPosition}
        >
          {farms.map((item, index) => (
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

        <View style={[sg.postitionAbsolute, sg.center, sg.contentPadding]}>
          <BackButton
            header={false}
            style={sg.pL0}
            iconStyle={sg.mL0}
            {...this.props}
          />
        </View>

        <View style={styles.farmCardsBl}>
          <FlatList
            data={farms}
            keyExtractor={item => item.id.toString()}
            renderItem={(...args) => this.renderFarmCard(...args)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export default connect()(TabFarms);
