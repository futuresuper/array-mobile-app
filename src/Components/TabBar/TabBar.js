import React from 'react';
import { Image } from 'react-native';
import { Button, Footer, FooterTab } from 'native-base';

import { routeNames, NavigationService } from 'src/Navigation';

import HomeActive from './images/HomeActive.png';
import HomeInactive from './images/HomeInactive.png';
import DollarActive from './images/DollarActive.png';
import DollarInactive from './images/DollarInactive.png';
import SunActive from './images/SunActive.png';
import SunInactive from './images/SunInactive.png';
import ChelActive from './images/ChelActive.png';
import ChelInactive from './images/ChelInactive.png';
import LeafActive from './images/LeafActive.png';
import LeafInactive from './images/LeafInactive.png';

import styles from './styles';

const TabBar = (props) => {
  const { navigation, screenProps } = props;
  const { state } = navigation;
  const { routeName } = NavigationService.getCurrentRoute(state);
  const theme = screenProps.getTheme();
  const iconStyle = {
    tintColor: theme.footerIconColor,
  };

  let iconHome = HomeInactive;
  let iconHomeStyle = iconStyle;
  if (routeName === routeNames.TAB_HOME) {
    iconHome = HomeActive;
    iconHomeStyle = {};
  }

  let iconActivity = DollarInactive;
  let iconActivityStyle = iconStyle;
  if (routeName === routeNames.TAB_ACTIVITY) {
    iconActivity = DollarActive;
    iconActivityStyle = {};
  }

  let iconFarms = SunInactive;
  let iconFarmsStyle = iconStyle;
  if (routeName === routeNames.SOLAR_FARMS_LIST || routeName === routeNames.SOLAR_FARMS_MAP) {
    iconFarms = SunActive;
    iconFarmsStyle = {};
  }

  let iconProfile = ChelInactive;
  let iconProfileStyle = iconStyle;
  if (
    (routeName === routeNames.TAB_PROFILE)
    || (routeName === routeNames.MANAGE_ACCOUNTS)
    || (routeName === routeNames.MANAGE_ACCOUNT_DETAILS)
    || (routeName === routeNames.MANAGE_ACCOUNT_DETAILS_EDIT)
  ) {
    iconProfile = ChelActive;
    iconProfileStyle = {};
  }

  let iconImpact = LeafInactive;
  let iconImpactStyle = iconStyle;
  if (routeName === routeNames.TAB_IMPACT) {
    iconImpact = LeafActive;
    iconImpactStyle = {};
  }

  return (
    <Footer>
      <FooterTab>
        <Button
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_HOME);
          }}
        >
          <Image source={iconHome} style={[iconHomeStyle]} />
        </Button>
        <Button
          active={routeName === ''}
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_ACTIVITY);
          }}
        >
          <Image source={iconActivity} style={[styles.iconActivityStyle, iconActivityStyle]} />
        </Button>
        <Button
          onPress={() => {
            screenProps.navigateTo(routeNames.SOLAR_FARMS_LIST);
          }}
        >
          <Image source={iconFarms} style={[iconFarmsStyle]} />
        </Button>
        {/*
        <Button
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_IMPACT);
          }}
        >
          <Image source={iconImpact} style={[iconImpactStyle]} />
        </Button>
        */}
        <Button
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_PROFILE);
          }}
        >
          <Image source={iconProfile} style={[iconProfileStyle]} />
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default TabBar;
