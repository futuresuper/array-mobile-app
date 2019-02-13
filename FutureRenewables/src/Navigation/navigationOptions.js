
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

import {
  isIOS,
} from 'src/Common/Helpers';

import { StyleConstants } from 'src/Styles';
import {
  drawerRoutes,
} from './routes';

// eslint-disable-next-line import/prefer-default-export
export const drawerOptions = ({ navigation, screenProps, options }) => {
  const { state } = navigation;
  const { routeName, params } = state;
  let title = '';
  let headerLeft;

  // if (route_name in drawerRoutes) {
    title = state.title;
  // }
  console.log('!!!state', state.params);
  console.log('!!!nav', navigation);


  if (!isIOS()) StatusBar.setBackgroundColor(StyleConstants.mainColor);

  return {
    title,
    headerLeft,
    headerStyle: {
      backgroundColor: StyleConstants.mainColor,
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      color: 'black',
    },
  };
};

export const noHeader = () => ({
  header: null,
});
