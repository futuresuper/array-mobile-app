
import React from 'react';

import TabBar from 'src/Components/TabBar';
import CloseButton from 'src/Components/CloseButton';
import BackButton from 'src/Components/BackButton';
import {
  isIOS,
} from 'src/Common/Helpers';
import {
  sc,
} from 'src/Styles';

import NavigationService from './NavigationService';

const isIOSv = isIOS();

export const signOptions = (props) => {
  const { navigation, screenProps } = props;
  const { state } = navigation;
  const params = state.params || {};
  const title = params.title || '';
  const headerStyle = navigation.getParam('headerStyle', {});
  const showBackButton = navigation.getParam('showBackButton', true);
  const theme = screenProps.getTheme();
  const backgroundColor = params.backgroundColor || theme.containerBgColor;

  const backButton = (
    <BackButton
      {...props}
      style={{ alignSelf: 'center' }}
      signup
    />
  );

  return {
    title,
    gesturesEnabled: showBackButton,
    headerLeft: showBackButton ? backButton : null,
    headerTitleStyle: {
      color: theme.textColor2,
      fontFamily: sc.font.bold,
      fontWeight: null,
      fontSize: 24,
    },
    headerStyle: {
      backgroundColor,
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
  tabBarComponent: (props) => <TabBar {...props} />,
  tabBarPosition: 'bottom',
  navigationOptions: (props) => {
    const { navigation, screenProps } = props;
    const { state } = navigation;
    const currentRoute = NavigationService.getCurrentRoute(state);
    const params = currentRoute.params || {};
    const header = params.noHeader ? null : undefined;
    const backgroundColor = params.backgroundColor || screenProps.getTheme().containerBgColor;

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
    const { navigation, screenProps } = props;
    const { state } = navigation;
    const currentRoute = NavigationService.getCurrentRoute(state);
    const theme = screenProps.getTheme();
    let params = currentRoute.params || {};
    const title = params.title || null;

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
      headerRight: <CloseButton white theme onPress={() => { navigation.popToTop(); }} {...props} />,
      headerStyle: {
        backgroundColor: theme.containerBgColor,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTitleStyle: {
        color: theme.textColor2,
        fontFamily: sc.font.bold,
        fontWeight: null,
        fontSize: 24,
      },
      title,
      header,
    };
  },
});

export const tabCardOptions = {
  navigationOptions: (props) => {
    const { navigation, screenProps } = props;
    const backButton = <BackButton {...props} style={{ alignSelf: 'center' }} />;
    const title = navigation.getParam('title');
    const headerTitleStyle = navigation.getParam('headerTitleStyle', {});
    const theme = screenProps.getTheme();

    return {
      headerLeft: backButton,
      headerStyle: {
        backgroundColor: theme.containerBgColor,
        borderBottomWidth: 0,
        elevation: 0,
        paddingTop: isIOSv ? undefined : 30,
        marginTop: isIOSv ? 15 : undefined,
      },
      headerTitleStyle: {
        color: theme.textColor,
        fontFamily: sc.font.bold,
        fontWeight: null,
        ...headerTitleStyle,
      },
      title,
      // header: null,
    };
  },
};
