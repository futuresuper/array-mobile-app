import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView as RNSafeAreaView } from 'react-navigation';
import ThemeService from 'src/Services/ThemeService';

const defaultForceInset = {
  top: 'always',
  left: 'always',
  right: 'always',
  bottom: 'always',
};

const defaultStyle = {
  flex: 1,
};

const SafeAreaView = ({ children, forceInset, style }) => (
  <RNSafeAreaView
    forceInset={{ ...defaultForceInset, ...forceInset }}
    style={[defaultStyle, { backgroundColor: ThemeService.getTheme().containerBgColor }, style]}
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
