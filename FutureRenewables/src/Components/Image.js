
import React, { Component } from 'react';
import {
  Image as ImageRN,
} from 'react-native';
import { connectStyle } from 'native-base';

class Image extends Component {
  render() {
    return (
      <ImageRN ref={(c) => { this._root = c; }} {...this.props} />
    );
  }
}

export default connectStyle('App.Image')(Image);
