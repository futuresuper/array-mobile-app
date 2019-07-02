
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {
  Content,
  Text,
} from 'native-base';

import WeatherWidget from 'src/Components/WeatherWidget';
import CircularProgress from 'src/Components/CircularProgress';
import routeNames from 'src/Navigation/routeNames';

import {
  sg,
  sc,
} from 'src/Styles';

import MarkerActive from 'src/assets/images/MarkerActive.png';
import BrigalowClear from 'src/assets/images/farms/BrigalowClear.png';
import ChinchillaClear from 'src/assets/images/farms/ChinchillaClear.png';
import SwanHillClear from 'src/assets/images/farms/SwanHillClear.png';
import SwanHill2Clear from 'src/assets/images/farms/SwanHill2Clear.png';

import { farmsList as styles } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class SolarFarmsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      farms: [
        {
          id: 1,
          title: 'Brigalow',
          description: 'Queensland',
          image: BrigalowClear,
          completed: 15,
          coordinate: {
            latitude: -26.8833514,
            longitude: 150.7383817,
          },
        },
        {
          id: 2,
          title: 'Chinchilla',
          description: 'Disneyland',
          image: ChinchillaClear,
          completed: 100,
          coordinate: {
            latitude: -26.7502014,
            longitude: 150.5923164,
          },
        },
        {
          id: 3,
          title: 'Swan Hill',
          description: 'Somethingland',
          image: SwanHillClear,
          completed: 50,
          coordinate: {
            latitude: -35.3621025,
            longitude: 143.4533884,
          },
        },
        {
          id: 4,
          title: 'Swan Hill2',
          description: 'whereisthisland',
          image: SwanHill2Clear,
          completed: 99,
          coordinate: {
            latitude: -35.367175,
            longitude: 143.6967643,
          },
        },
      ],
    };
  }

  renderFarmCard({ item }) {
    const { screenProps } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          screenProps.navigateTo(routeNames.SOLAR_FARM, { item });
        }}
      >
        <ImageBackground source={item.image} resizeMode="stretch" style={styles.farmImage}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{}}>
              <Text style={[sg.fS20, sg.colorDark2, sg.textBold]}>{item.title}</Text>
              <Text style={[sg.fontMedium, sg.mT5]}>{item.description}</Text>
            </View>

            <WeatherWidget
              coordinate={item.coordinate}
            />
          </View>

          <View style={[sg.row, sg.aICenter]}>
            <CircularProgress
              progress={item.completed / 100}
              borderWidth={1}
              size={18}
              color={sc.color.primary}
              borderColor={sc.color.gray6}
            />
            <Text style={[sg.colorWhite, sg.fS14, sg.fontMedium, sg.mL15]}>
              {item.completed}
              % Completed
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  render() {
    const { screenProps } = this.props;
    const { farms } = this.state;

    return (
      <Content padder>
        <View style={[sg.aICenter, sg.mB20]}>
          <Text style={[sg.fS24, sg.textBold]} color2>
            Explore your
            {'\n'}
            Solar Farms
          </Text>

          <TouchableOpacity
            style={styles.markerImage}
            onPress={() => {
              screenProps.navigateTo(routeNames.SOLAR_FARMS_MAP, { farms });
            }}
          >
            <Image source={MarkerActive} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={farms}
          keyExtractor={item => item.id.toString()}
          renderItem={(...args) => this.renderFarmCard(...args)}
        />
      </Content>
    );
  }
}

export default connect()(SolarFarmsList);
