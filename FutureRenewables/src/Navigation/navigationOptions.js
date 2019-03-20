
import React from 'react';
import {
  StatusBar,
} from 'react-native';

import _ from 'lodash';

import {
  Button,
  Icon,
  View,
  Text,
  Footer,
  FooterTab,
} from 'native-base';


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

export const tabBarOptions = {
  tabBarComponent: (props) => {
    const { state } = props.navigation;
    const { routeName } = state.routes[state.index];

    console.log('!!!', routeName);

    return (
      <Footer>
        <FooterTab>
          <Button
            active={routeName === ''}
          >
            <Text>123</Text>
          </Button>
          <Button
            onPress={() => {
              props.navigation.navigate('TabActivity');
            }}
          >
            <Text>123</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  },
  tabBarPosition: 'bottom',
  // tabBarOptions: {
  //   activeTintColor: '#3CC8F7',
  //   inactiveTintColor: '#9B9B9B',
  //   // showLabel: false,
  //   // showIcon: true,
  //   indicatorStyle: {
  //     backgroundColor: '#3CC8F7',
  //   },
  //   style: {
  //     backgroundColor: 'black',
  //   },
  // },
};
