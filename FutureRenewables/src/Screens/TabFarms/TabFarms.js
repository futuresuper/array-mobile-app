
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  FlatList,
  Image,
} from 'react-native';

import {
  Text,
  Icon,
  H1,
  H3,
  Card,
  CardItem,
  Left,
  Right,
  Body,
} from 'native-base';

import MapView from 'react-native-maps';

import {
  routeNames,
} from 'src/Navigation';
import CircularProgress from 'src/Components/CircularProgress';
import solarHeart from 'src/assets/images/solarHeart.png';

import {
  isIOS as isIOSF,
} from 'src/Common/Helpers';

import {
  sg,
  sc,
} from 'src/Styles';

import styles from './styles';

const isIOS = isIOSF();

class TabFarms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      farms: [
        {
          id: 1,
          title: 'Brigalow',
          description: 'Queensland',
          completed: 15,
          coordinate: {
            latitude: -26.8833514,
            longitude: 150.7383817,
          },
        },
        {
          id: 2,
          title: 'Swan Hill',
          description: 'Somethingland',
          completed: 50,
          coordinate: {
            latitude: -35.3621025,
            longitude: 143.4533884,
          },
        },
        {
          id: 3,
          title: 'Chinchilla',
          description: 'Disneyland',
          completed: 100,
          coordinate: {
            latitude: -26.7502014,
            longitude: 150.5923164,
          },
        },
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

  renderMarker = (item) => {
    const { activeFarmId } = this.state;
    let iconStyle = {};
    if (activeFarmId === item.id) {
      iconStyle = styles.marketIconActive;
    }

    return (
      <View style={sg.center}>
        <Icon style={[styles.marketIcon, iconStyle]} type="FontAwesome" name="map-marker" />
        <Text style={[styles.marketTitle]}>{item.title}</Text>
      </View>
    );
  }

  renderFarmCard = ({ item }) => (
    <Card style={styles.farmCardBl}>
      <CardItem
        button
        onPress={() => {
          this.activateFarm(item);
        }}
        style={styles.farmCardItem}
      >
        <Left>
          <Image
            resizeMode="cover"
            source={solarHeart}
            style={styles.farmCardImage}
          />
        </Left>
        <Body style={styles.farmCardBody}>
          <H3>{item.title}</H3>
          <Text style={styles.farmCardTextDescription}>{item.description}</Text>
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
            color={sc.color.dark}
            shadowColor={sc.color.gray2}
            bgColor={sc.color.white}
          />
        </Right>
      </CardItem>
    </Card>
  )

  render() {
    const { screenProps } = this.props;
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
                screenProps.navigateTo(routeNames.SOLAR_FARM, { item });
              }}
            >
              {this.renderMarker(item)}
            </MapView.Marker>
          ))}
        </MapView>

        <View style={[sg.postitionAbsolute, sg.center, (isIOS ? sg.p30 : sg.p20)]}>
          <H1 style={sg.textBold}>Solar farms</H1>
        </View>

        <View style={styles.farmCardsBl}>
          <FlatList
            data={farms}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderFarmCard}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export default connect()(TabFarms);
