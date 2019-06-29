import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView as RNSafeAreaView } from 'react-navigation';

import {
  sc,
} from 'src/Styles';

const defaultForceInset = {
  top: 'always',
  left: 'always',
  right: 'always',
  bottom: 'always',
};

const defaultStyle = {
  flex: 1,
  backgroundColor: sc.color.containerBgColor,
};

const SafeAreaView = ({ children, forceInset, style }) => (
  <RNSafeAreaView
    forceInset={{ ...defaultForceInset, ...forceInset }}
    style={[defaultStyle, style]}
  >
    {children}
  </RNSafeAreaView>
);

SafeAreaView.defaultProps = {
  forceInset: {},
  style: {},
};

SafeAreaView.propTypes = {
  children: PropTypes.node.isRequired,
  forceInset: PropTypes.object,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default SafeAreaView;
