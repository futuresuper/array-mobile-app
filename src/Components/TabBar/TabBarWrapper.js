
import React from 'react';
import {
  View,
} from 'react-native';

import {
  sg,
} from 'src/Styles';

import TabBar from './TabBar';

const TabBarWrapper = (props) => {
  const {
    children,
    ...otherProps
  } = props;

  return (
    <View style={sg.flex}>
      {children}
      <TabBar {...otherProps} />
    </View>
  );
};

export default TabBarWrapper;
