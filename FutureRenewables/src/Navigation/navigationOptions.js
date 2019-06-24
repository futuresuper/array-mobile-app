
import React from 'react';

import TabBar from 'src/Components/TabBar';
import CloseButton from 'src/Components/CloseButton';
import BackButton from 'src/Components/BackButton';
import {
  sc,
} from 'src/Styles';

import NavigationService from './NavigationService';

export const signOptions = (props) => {
  const { navigation } = props;
  const { state } = navigation;
  const params = state.params || {};
  const title = params.title || '';
  const headerStyle = navigation.getParam('headerStyle', {});
  const backButton = (
    <BackButton
      {...props}
      style={{ alignSelf: 'center' }}
      signup
    />
  );

  return {
    title,
    headerLeft: backButton,
    headerStyle: {
      backgroundColor: sc.containerBgColor,
      borderBottomWidth: 0,
      elevation: 0,
      ...headerStyle,
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
    const currentRoute = NavigationService.getCurrentRoute(state);
    const params = currentRoute.params || {};
    const header = params.noHeader ? null : undefined;
    const backgroundColor = params.backgroundColor || sc.containerBgColor;

    return {
      headerStyle: {
        backgroundColor,
        borderBottomWidth: 0,
        elevation: 0,
        height: 0,
        paddingBottom: 24,
      },
      header,
    };
  },
};

export const tabModalOptions = (propsInp = {}) => ({
  screen: propsInp.screen,
  navigationOptions: (props) => {
    const { params: paramsInp } = propsInp;
    const { navigation } = props;
    const { state } = navigation;
    const currentRoute = NavigationService.getCurrentRoute(state);
    let params = currentRoute.params || {};

    if (paramsInp) {
      params = {
        ...paramsInp,
        ...params,
      };
    }

    const header = params.noHeader ? null : undefined;
    const backButton = params.backButton ? <BackButton {...props} style={{ alignSelf: 'center' }} /> : null;

    return {
      headerLeft: backButton,
      headerRight: <CloseButton onPress={() => { navigation.popToTop(); }} />,
      headerStyle: {
        backgroundColor: sc.containerBgColor,
        borderBottomWidth: 0,
        elevation: 0,
      },
      header,
    };
  },
});

export const tabCardOptions = {
  navigationOptions: (props) => {
    const { navigation } = props;
    const backButton = <BackButton {...props} style={{ alignSelf: 'center' }} />;
    const title = navigation.getParam('title');
    const headerTitleStyle = navigation.getParam('headerTitleStyle', {});

    return {
      headerLeft: backButton,
      headerStyle: {
        backgroundColor: sc.containerBgColor,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTitleStyle: {
        color: sc.color.dark3,
        fontFamily: sc.font.bold,
        ...headerTitleStyle,
      },
      title,
      // header: null,
    };
  },
};
