/* eslint-disable global-require */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import {View} from 'react-native';
import {Text} from 'native-base';

import {Config} from 'src/Common/config';

import {sc} from 'src/Styles';

import WeatherIcon from './WeatherIcon';
import styles from './styles';

const weatherIcons = {
  default: 'wi-thermometer',
  'partly-cloudy-day': 'wi-day-cloudy',
  'partly-cloudy-night': 'wi-night-alt-partly-cloudy',
  'clear-day': 'wi-day-sunny',
  'clear-night': 'wi-night-clear',
  rain: 'wi-rain',
  snow: 'wi-snow',
  sleet: 'wi-sleet',
  wind: 'wi-strong-wind',
  fog: 'wi-fog',
  cloudy: 'wi-cloudy',
  hail: 'wi-hail',
  thunderstorm: 'wi-thunderstorm',
  tornado: 'wi-tornado',
  'meteor-shower': 'wi-meteor',
};

class WeatherWidget extends Component {
  constructor(props) {
    super(props);

    this.weatherDefState = {
      summary: '',
      temp: '',
      icon: 'default',
      precipChance: 0,
    };

    this.state = {
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      isLoading: true,
      ...this.weatherDefState,
    };
  }

  componentDidMount() {
    this.apiRequest(this.props);
  }

  componentDidUpdate(nextProps) {
    this.apiRequest(nextProps);
  }

  setStateSync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  async apiRequest(props) {
    const {coordinate: coordinateProp} = props;
    const {coordinate: coordinateState} = this.state;
    const apiKey = Config.get().darkSkyKey;
    const url = `https://api.darksky.net/forecast/${apiKey}/${
      coordinateProp.latitude
    },${coordinateProp.longitude}`;

    if (_.isNil(coordinateProp.latitude) && _.isNil(coordinateProp.longitude)) {
      return;
    }

    if (
      coordinateProp.latitude === coordinateState.latitude &&
      coordinateProp.longitude === coordinateState.longitude
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
    })
      .then(res => {
        if (res && res.data) {
          const {data} = res;

          this.setState({
            summary: data.currently.summary,
            icon: data.currently.icon,
          });
        }

        this.setState({
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const {style, showSummary} = this.props;
    const {isLoading, summary, icon} = this.state;

    if (isLoading) {
      return null;
    }

    if (summary === '') {
      return null;
    }

    return (
      <View style={[styles.container, style]}>
        <WeatherIcon
          style={styles.icon}
          name={weatherIcons[icon] || weatherIcons.default}
          color={sc.color.dark3}
        />
        {showSummary && <Text style={styles.summary}>{summary}</Text>}
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
  showSummary: true,
};

WeatherWidget.propTypes = {
  coordinate: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  showSummary: PropTypes.bool,
};

export default WeatherWidget;
