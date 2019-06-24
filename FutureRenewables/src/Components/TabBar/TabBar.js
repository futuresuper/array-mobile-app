
import React from 'react';
import {
  Image,
} from 'react-native';
import {
  Button,
  Footer,
  FooterTab,
} from 'native-base';

import {
  routeNames,
  NavigationService,
} from 'src/Navigation';

import HomeActive from './images/HomeActive.png';
import HomeInactive from './images/HomeInactive.png';
import DollarActive from './images/DollarActive.png';
import DollarInactive from './images/DollarInactive.png';
import SunActive from './images/SunActive.png';
import SunInactive from './images/SunInactive.png';
import ChelActive from './images/ChelActive.png';
import ChelInactive from './images/ChelInactive.png';

const TabBar = (props) => {
  const { navigation, screenProps } = props;
  const { state } = navigation;
  const { routeName } = NavigationService.getCurrentRoute(state);

  const iconHome = routeName === routeNames.TAB_HOME ? HomeActive : HomeInactive;
  const iconActivity = routeName === routeNames.TAB_ACTIVITY ? DollarActive : DollarInactive;
  const iconFarms = routeName === routeNames.SOLAR_FARMS_LIST ? SunActive : SunInactive;
  const iconProfile = routeName === routeNames.TAB_PROFILE ? ChelActive : ChelInactive;

  return (
    <Footer>
      <FooterTab>
        <Button
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_HOME);
          }}
        >
          <Image source={iconHome} />
        </Button>
        <Button
          active={routeName === ''}
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_ACTIVITY);
          }}
        >
          <Image source={iconActivity} />
        </Button>
        <Button
          onPress={() => {
            screenProps.navigateTo(routeNames.SOLAR_FARMS_LIST);
          }}
        >
          <Image source={iconFarms} />
        </Button>
        <Button
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_PROFILE);
          }}
        >
          <Image source={iconProfile} />
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default TabBar;
