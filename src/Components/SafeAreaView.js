import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView as RNSafeAreaView } from 'react-navigation';
import { sc } from 'src/Styles';

const defaultForceInset = {
  top: 'always',
  left: 'always',
  right: 'always',
  bottom: 'always',
};

const defaultStyle = {
  flex: 1,
};

const SafeAreaView = ({
  children, forceInset, style, themeMode,
}) => (
  <RNSafeAreaView
    forceInset={{ ...defaultForceInset, ...forceInset }}
    style={[defaultStyle, { backgroundColor: themeMode === 'dark' ? sc.color.dark4 : sc.color.containerBgColor }, style]}
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
  themeMode: PropTypes.string.isRequired,
  forceInset: PropTypes.object,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default SafeAreaView;
