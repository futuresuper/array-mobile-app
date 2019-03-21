
import React from 'react';
import {
  Icon,
  Button,
  Footer,
  FooterTab,
} from 'native-base';

import {
  routeNames,
} from 'src/Navigation';

import styles from './styles';

const TabBar = (props) => {
  const { navigation, screenProps } = props;
  const { state } = navigation;
  const { routeName } = state.routes[state.index];

  const iconHomeActive = routeName === routeNames.TAB_HOME ? styles.iconActive : {};
  const iconActivityActive = routeName === routeNames.TAB_ACTIVITY ? styles.iconActive : {};
  const iconFarmsActive = routeName === routeNames.TAB_FARMS ? styles.iconActive : {};
  const iconProfileActive = routeName === routeNames.TAB_PROFILE ? styles.iconActive : {};

  return (
    <Footer>
      <FooterTab>
        <Button
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_HOME);
          }}
        >
          <Icon name="md-home" style={[styles.icon, iconHomeActive]} />
        </Button>
        <Button
          active={routeName === ''}
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_ACTIVITY);
          }}
        >
          <Icon type="FontAwesome" name="dollar" style={[styles.icon, iconActivityActive]} />
        </Button>
        <Button
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_FARMS);
          }}
        >
          <Icon type="MaterialCommunityIcons" name="weather-sunset" style={[styles.icon, iconFarmsActive]} />
        </Button>
        <Button
          onPress={() => {
            screenProps.navigateTo(routeNames.TAB_PROFILE);
          }}
        >
          <Icon type="FontAwesome" name="user-o" style={[styles.icon, iconProfileActive]} />
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default TabBar;
