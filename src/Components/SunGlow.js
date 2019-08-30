
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
    const { currentTime } = this.props;
    const timeLapse = getTimeLapse(currentTime);
    let image = CircleNight2;

    if (timeLapse.isSunrise) {
      image = CircleSunrise;
    } else if (timeLapse.isDay) {
      image = CircleDay;
    } else if (timeLapse.isSunset) {
      image = CircleSunset;
    }

    // temporary
    image = CircleSunrise;

    return image;
  }

  render() {
    // const image = this.getImage();
    const image = CircleSunrise;

    return (
      <Image source={image} {...this.props} />
    );
  }
}

SunGlow.propTypes = {
  currentTime: PropTypes.string.isRequired,
};

export default SunGlow;
