
import React from 'react';

import TabBar from 'src/Components/TabBar';
import CloseButton from 'src/Components/CloseButton';
import BackButton from 'src/Components/BackButton';
import {
  styleConstants,
} from 'src/Styles';

import routeNames from './routeNames';

export const signOptions = (props) => {
  const { navigation } = props;
  const { state } = navigation;
  const params = state.params || {};
  const title = params.title || '';
  const backButton = (
    <BackButton
      {...props}
      style={{ alignSelf: 'center' }}
      icon={{
        name: 'md-arrow-back',
        style: {
          fontSize: 30,
          color: styleConstants.color.gray11,
        },
      }}
    />
  );

  return {
    title,
    headerLeft: backButton,
    headerStyle: {
      backgroundColor: styleConstants.containerBgColor,
      borderBottomWidth: 0,
      elevation: 0,
    },
  };
};

export const noHeader = () => ({
  header: null,
});

export const tabBarOptions = {
  tabBarComponent: props => <TabBar {...props} />,
  tabBarPosition: 'bottom',
  navigationOptions: (props) => {
    const { navigation } = props;
    const { state } = navigation;
    const currentRoute = state.routes[state.index];
    const params = currentRoute.params || {};
    const header = params.noHeader ? null : undefined;
    const backgroundColor = params.backgroundColor || styleConstants.containerBgColor;

    return {
      headerStyle: {
        backgroundColor,
        borderBottomWidth: 0,
        elevation: 0,
        height: 0,
        paddingBottom: 20,
      },
      header,
    };
  },
};

export const tabModalOptions = {
  navigationOptions: (props) => {
    const { navigation } = props;
    const { state } = navigation;
    const currentRoute = state.routes[state.index];
    const params = currentRoute.params || {};
    const header = params.noHeader ? null : undefined;
    const backButton = params.backButton ? <BackButton {...props} style={{ alignSelf: 'center' }} /> : null;

    return {
      headerLeft: backButton,
      headerRight: <CloseButton onPress={() => { navigation.popToTop(); }} />,
      headerStyle: {
        backgroundColor: styleConstants.containerBgColor,
        borderBottomWidth: 0,
        elevation: 0,
      },
      header,
    };
  },
};

export const tabCardOptions = {
  navigationOptions: (props) => {
    const { navigation } = props;
    const backButton = <BackButton {...props} style={{ alignSelf: 'center' }} />;
    const title = navigation.getParam('title');

    return {
      headerLeft: backButton,
      headerStyle: {
        backgroundColor: styleConstants.containerBgColor,
        borderBottomWidth: 0,
        elevation: 0,
      },
      title,
    };
  },
};
