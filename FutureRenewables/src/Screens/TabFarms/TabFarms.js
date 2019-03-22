
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
  H2,
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

import solarHeart from 'src/assets/images/solarHeart.png';

import {
  isIOS as isIOSF,
} from 'src/Common/Helpers';

import {
  sg,
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
    const deltaX = (maxX - minX) + 2;
    const deltaY = (maxY - minY) + 2;

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

  renderFarmCard = ({ item }) => {
    return (
      <Card style={styles.farmCardBl}>
        <CardItem
          button
          onPress={() => {
            console.log('!!!', {  });
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
            <Text>333</Text>
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
          style={sg.absoluteFillObject}
          region={startPosition}
        >
          {farms.map((item, index) => (
            <MapView.Marker
              key={index.toString()}
              coordinate={item.coordinate}
            >
              {this.renderMarker(item)}
            </MapView.Marker>
          ))}
        </MapView>

        <View style={[sg.postitionAbsolute, sg.center, (isIOS ? sg.p30 : sg.p20)]}>
          <H1 style={sg.textBold}>Solar farms</H1>
          <Text style={[sg.textCenter, sg.mT10]}>
            Your money goes directly to helping build solar farms across Australia.
            Find out more about them and see the impact your invetment has.
          </Text>
        </View>

        <View style={styles.farmCardsBl}>
          <FlatList
            data={farms}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderFarmCard}
            horizontal
          />
        </View>
      </View>
    );
  }
}

export default connect()(TabFarms);
