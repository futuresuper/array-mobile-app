
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  Text,
  Item,
  Icon,
} from 'native-base';

import composeHoc from 'src/Common/Hocs';
import {
  Input,
  Picker,
} from 'src/Components/Form';
import {
  routeNames,
} from 'src/Navigation';

import {
  sg,
} from 'src/Styles';

class Withdraw extends Component {

  render() {
    return (
      <Text>123</Text>
    );
  }
}

const res = composeHoc([
  'FormHoc',
])(Withdraw);

export default res;