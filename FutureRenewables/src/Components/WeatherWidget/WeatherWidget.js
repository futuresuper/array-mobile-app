/* eslint-disable global-require */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import {
  View,
  Image,
} from 'react-native';
import {
  Text,
  Spinner,
} from 'native-base';

import {
  Config,
} from 'src/Common/config';

import {
  sc,
} from 'src/Styles';

import defaultIcon from './img/default.png';
import partlyCloudyDay from './img/partly-cloudy-day.png';
import partlyCloudyNight from './img/partly-cloudy-night.png';
import clearday from './img/clear-day.png';
import clearNight from './img/clear-night.png';
import rain from './img/rain.png';
import snow from './img/snow.png';
import sleet from './img/sleet.png';
import wind from './img/wind.png';
import fog from './img/fog.png';
import cloudy from './img/cloudy.png';
import hail from './img/hail.png';
import thunderstorm from './img/thunderstorm.png';
import tornado from './img/tornado.png';
import meteorShower from './img/meteor-shower.png';

import styles from './styles';

const weatherIcons = {
  default: defaultIcon,
  'partly-cloudy-day': partlyCloudyDay,
  'partly-cloudy-night': partlyCloudyNight,
  'clear-day': clearday,
  'clear-night': clearNight,
  rain,
  snow,
  sleet,
  wind,
  fog,
  cloudy,
  hail,
  thunderstorm,
  tornado,
  'meteor-shower': meteorShower,
};

class WeatherWidget extends Component {
  constructor(props) {
    super(props);
    const { coordinate } = this.props;

    this.weatherDefState = {
      summary: '',
      temp: '',
      icon: 'default',
      precipChance: 0,
    };

    this.state = {
      coordinate,
      isLoading: true,
      ...this.weatherDefState,
    };
  }

  componentDidMount() {
    this.apiRequest(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.apiRequest(nextProps);
  }

  setStateSync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async apiRequest(props) {
    const { coordinate: coordinateProp } = props;
    const { coordinate: coordinateState } = this.state;
    const apiKey = Config.get().darkSkyKey;
    const url = `https://api.darksky.net/forecast/${apiKey}/${coordinateProp.latitude},${coordinateProp.longitude}`;

    if (_.isNil(coordinateProp.latitude) && _.isNil(coordinateProp.longitude)) {
      return;
    }

    if (
      (coordinateProp.latitude === coordinateState.latitude)
      && (coordinateProp.longitude === coordinateState.longitude)
    ) {
      return;
    }

    await this.setStateSync({
      coordinate: coordinateProp,
      ...this.weatherDefState,
    });

    axios({
      url,
      timeout: 5000,
      method: 'GET',
    }).then((res) => {
      if (res && res.data) {
        const { data } = res;

        this.setState({
          summary: data.currently.summary,
          icon: data.currently.icon,
          isLoading: false,
        });
      }
    }).catch(() => null);
  }

  render() {
    const { style } = this.props;
    const { isLoading, summary, icon } = this.state;

    if (isLoading) {
      return <Spinner size="small" color={sc.color.gray4} style={styles.spinner} />;
    }

    if (summary === '') {
      return null;
    }

    return (
      <View style={[styles.container, style]}>
        <Image style={styles.icon} source={weatherIcons[icon] || weatherIcons.default} />
        <Text style={styles.summary}>{summary}</Text>
      </View>
    );
  }
}

WeatherWidget.defaultProps = {
  coordinate: {
    latitude: null,
    longitude: null,
  },
  style: {},
};

WeatherWidget.propTypes = {
  coordinate: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default WeatherWidget;
