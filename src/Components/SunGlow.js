
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
} from 'react-native';

import {
  getTimeLapse,
} from 'src/Common/Helpers';

import CircleSunrise from 'src/assets/images/CircleSunrise.png';
import CircleDay from 'src/assets/images/CircleDay.png';
import CircleSunset from 'src/assets/images/CircleSunset.png';
// import CircleNight from 'src/assets/images/CircleNight.png';
import CircleNight2 from 'src/assets/images/CircleNight2.png';

class SunGlow extends Component {
  getImage() {
    const { currentFarmTime } = this.props;
    const timeLapse = getTimeLapse(currentFarmTime);
    let image = CircleNight2;

    if (timeLapse.isDawn) {
      image = CircleSunrise;
    } else if (timeLapse.isDay) {
      image = CircleDay;
    } else if (timeLapse.isDusk) {
      image = CircleSunset;
    } else if (timeLapse.isEvening) {
      image = CircleNight2;
    } else if (timeLapse.isNight) {
      image = CircleNight2;
    }

    return image;
  }

  render() {
    const image = this.getImage();

    return (
      <Image source={image} {...this.props} />
    );
  }
}

SunGlow.propTypes = {
  currentFarmTime: PropTypes.object.isRequired,
};

export default SunGlow;
