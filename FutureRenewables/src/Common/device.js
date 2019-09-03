import {
  Dimensions,
} from 'react-native';

export default {
  screenWidth() {
    return Dimensions.get('window').width;
  },

  screenHeight() {
    return Dimensions.get('window').height;
  },

  screenAspectRatio() {
    return this.screenWidth() / this.screenHeight();
  },
};
