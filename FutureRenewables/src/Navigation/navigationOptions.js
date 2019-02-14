
import React from 'react';
import {
  StatusBar,
} from 'react-native';

import {
  Button,
  Icon,
  View,
  Text,
} from 'native-base';
import _ from 'lodash';


// eslint-disable-next-line import/prefer-default-export
export const drawerOptions = ({ navigation, screenProps }) => {
  const { state } = navigation;
  const params = state.params || {};
  const title = params.title || '';
  let headerLeft;

  return {
    title,
    headerLeft,
  };
};

export const noHeader = () => ({
  header: null,
});
