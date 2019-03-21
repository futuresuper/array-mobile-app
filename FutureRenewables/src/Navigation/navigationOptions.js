
import React from 'react';

import {
  Text,
} from 'native-base';

import TabBar from 'src/Components/TabBar';
import CloseButton from 'src/Components/CloseButton';
import {
  styleConstants,
} from 'src/Styles';

export const drawerOptions = ({ navigation }) => {
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

export const tabBarOptions = {
  tabBarComponent: props => <TabBar {...props} />,
  tabBarPosition: 'bottom',
  navigationOptions: {
    headerStyle: {
      backgroundColor: styleConstants.containerBgColor,
      borderBottomWidth: 0,
      elevation: 0,
      height: 0,
      paddingBottom: 20,
    },
  },
};

export const tabModalOptions = {
  navigationOptions: ({ screenProps }) => ({
    headerLeft: null,
    headerRight: <CloseButton onPress={() => { screenProps.routeBack(); }} />,
    headerStyle: {
      backgroundColor: styleConstants.containerBgColor,
      borderBottomWidth: 0,
      elevation: 0,
    },
  }),
};
